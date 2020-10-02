# MultiSig Scheme
Here are step-by-step description of two multi-signature schemes: [MuSig: n-of-n Multi-Signature Scheme](##MuSig:-n-of-n-Multi-Signature-Scheme) and [ t-of-n Threshold Signature Scheme](##t-of-n-Threshold-Signature-Scheme)
## MuSig: n-of-n Multi-Signature Scheme
### Overview
MuSig is effectively a multi-signature and key-aggregation scheme based on Schnorr Signatures. It provides security in plain public key model. 

A working full round **typescript** example can be found [here](##Examples)


_Note: all codes  are actually pseudocode just for illustrations purpose. Available functions can be found in typescript example_

A step-by-step description is as follows:

### Setup
#### step one
User generates public-private keypair and sends public key to broker
```
    private_key, public_key = generate_keypair();

    for i in len(all_users)
        send_to_user(public_key, all_users[i])
    end for    
```
#### step two
Once the receives other parties' public keys, user computes and stores aggregated public key
```
    let all_pubkeys = [pubkey_1, .., pubkey_n]
    let aggregated_pubkey = compute_aggregated_pubkey(all_pubkeys)
    // store aggregated_pubkey
```

### Aggregated Commitment
#### step one
User generates crytographically secure nonce
```
    nonce = generate_nonce()    
```
User commits his nonce
```
    commitment = compute_commitment(nonce)        
```
User hashes commitment
```
    pre_commitment = compute_pre_commitment(commitment)
```
User sends pre-commitment to other users through broker
```
    for i in len(all_users)
        send_to_user(pre_commitment, all_users[i])               
    end for 
```
#### step two
Once user receive the pre_commitment, user reveals his commitment to other users through broker
```
    for i in len(all_users)
        send_to_user(commitment, all_users[i])               
    end for 
```
Once user receives commitments from other parties, user computes aggregated commitment and stores it
```
    let all_commitments = [commitment from user 1, ... commitment from user n]
    let aggregated_commitment = compute_aggregated_commitment(all_commitments)
```


_Note: By using [Pre-Shared Commitments](####Pre-Shared-Commitments), number of rounds can be decreased by one_

### Signing
#### step one
Initiator prepares transaction and sends it to other users through broker
```
    let transaction = {from: 0xAA, to: 0xBB, ..}
    let encoded_transaction = encode_transaction(transaction)
    for i in len(all_users)
        send_to_user(encoded_transaction, all_users[i])               
    end for 
```
#### step two
Once the user receives transaction signing message from initiator, user signs transaction with his private key and nonce and sends signature share to other users through broker
```
    let transaction = message.transaction
    let signature_share = sign(private_key, nonce, all_pubkeys, commitment, aggregated_commitment)     
    
    
    let signing_result = {
        signature_shares: signature_share,
        commitment: commitment,
    } 
    
    for i in len(all_users)
        send_to_user(signing_result, all_users[i])               
    end for 
```
#### step three
Once the user receives all signing results from each user, user aggregates signature shares
```
    let all_signature_shares = [signature share from user 1, .. , signature share from user n]
    let aggregated_signature = compute_aggregated_signature(all_signature_shares)
    
    let final_signature = {
        r: aggregated_commitment,
        s: aggregated_signature
    }
```
User sends final signature to the broker
```
    send_to_broker(final_signature)
```

#### step four
Broker submits transaction to the network if each received signature equal and valid
```
    let all_final_signatures = [final signature from user 1, .. , final signature from user n]
    for i in len(all_final_signatures)
        if i == 0 
            continue
        end if 
        if all_final_signatures[i-1] != all_final_signatures[i]
            exit
        end if        
    end for
    if !is_signature_valid(all_final_signatures[0]) // verification of single sig is enough
        exit
    end if
    
    submit_transaction(transaction, final_signature)
```


## t-of-n Threshold Signature Scheme
### Overview
The threshold signing algorithm is an signature aggregation scheme based on MuSig Schnorr signatures and the EdDSA signing procedure. Signatures are non-deterministic though as they include random participant commitments. 

In order to achieve threshold, original private key essentially splitted into `n` secret shares and  each user needs to have `t` permuatation of them. 

For example, for a `3-of-4` multisig (`t=3`, `N=4`), the permuations of size `t-1=2` are:

```
[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]
```

Every user computes the key distribution as follows:

- For each permutation, a new private key share must be assigned to all users **who are not part of this permutation**:
```
[1, 2]: A => 3, 4
[1, 3]: B => 2, 4
[1, 4]: C => 2, 3
[2, 3]: D => 1, 4
[2, 4]: E => 1, 3
[3, 4]: F => 1, 2

```
- For every secret share, one user from the user subset sharing it (the one with the lowest position number) must generate it and share with the others to whom it should be assigned. In our example:
```
Share A: generated by user 3, shared with user 4.
Share B: generated by user 2, shared with user 4.
Share C: generated by user 2, shared with user 3.
Share D: generated by user 1, shared with user 4.
Share E: generated by user 1, shared with user 3.
Share F: generated by user 1, shared with user 2.
```

- So, each user has following secret shares

```
user 1 has [D, E, F]
user 2 has [B, C, F]
user 3 has [A, C, E]
user 4 has [A, B, D]
```

- At the end any combination of three users can construct original private key

```
    user 1 + user 2 + user 3 = [A, B, C, C, D, E, E, F, F]
    user 1 + user 3 + user 4 = [A, A, B, C, D, D, E, E, F]
    user 2 + user 3 + user 4 = [A, A, B, B, C, C, D, E, F]
```
- Finally any combination of two users can not construct original private key 
```
    user 1 + user 2 = [B, C, D, E, F, F] missing [A]
    user 1 + user 3 = [A, C, D, E, E, F] missing [B]
    user 1 + user 4 = [A, B, D, D, E, F] missing [C]
    user 2 + user 3 = [A, B, C, C, E, F] missing [D]
    user 2 + user 4 = [A, B, B, C, D, F] missing [E]
    user 3 + user 4 = [A, A, B, C, D, E] missing [F]
```
_A full round example for t-of-n scheme will be implemented in typescript_

### Setup 
#### Distributed Key Generation
Every user contributes computation of the key distribution as follows:
##### step one
User generates the list of all possible permutations of users of size t-1 which he needs to generate the share. 
```        
    let permutations = generate_permutations(n, t, user_index)
    // permutations : [1,3] => [2,4], [1,4] => [2,3]
```
##### step two
User generates private keys and corresponding public keys for each remaining permutation generated in the first step
```
    let receiving_users = []
    for p in permutations
        receiving_users.push(p[1])
    end for
    // receiving_users: 4, 3
    
    let private_keys = []
    let public_keys = []
    for user in receiving_users
        private_key, public_key = generate_keypair();
        private_keys.push(private_key)
        public_keys.push(public_key)            
    end for
    
```
User sends each private key to user who needs that share  

```    
    for i in len(receiving_users)
        send_to_user(private_keys[i], receiving_users[i])
    end for
    
```
User sends each public key to all users and broker

```
    for i in len(all_users)
        if i != user_index
            send_to_user(public_keys[i], all_users[i])       
        end if
    end for
    
    send_to_broker(public_keys)
```
##### step three
Once the user receives public keys, user makes a unique list of public keys and stores computed aggregated public key from that unique list.
```
    let pubkey_list = unique(all_received_pubkeys)
    aggregated_pubkey = compute_aggregated_pubkey(pubkey_list)
    // store aggregated_pubkey
```

##### step four
Once broker receives all public keys, broker computes ethereum address and creates corresponding zksync account
```
    let ethereum_address = compute_eth_address(..) // !!
    create_zksync_account(ethereum_address, aggregated_pubkey)
```

#### Pre-Shared Commitments
Having to go through the three rounds every time we want to sign a message is certainly inconvenient. Especially if the signature is time-critical and network messages are slow. So how about this, we do the first two rounds whenever it’s convenient for us. And only once there is a message to sign, we exchange partial signatures. For example, the user of multisig exchange a bunch of (k) nonce commitments and pre-commitments immediately when establishing a connection. When it comes to signing a transaction, one of the pre-shared nonces is used and only one communication round is required to complete the signature.


##### step one
User generates `k` cryptographically secure nonces and computes commitment and pre-commitment for each nonce. (`k` is the number of desired transactions)
```
    let nonces = []
    let commitments = []
    let pre_commitments = []
    for i in range(k)
        nonce = generate_nonce()    
        commitment = compute_commitment(nonce)
        pre_commitment = compute_pre_commitment(commitment)
        
        nonces.push(nonce)
        commitments.push(commitment)
        pre_commitments.push(pre_commitment)
    end for
```
##### step two
User sends each pre-commitments to all users
```        
    for user in all_users
        send_to_user(pre_commitments, user)    
    end for
```

Once the user receive pre-commitments from all other parties, user stores received pre-commitments

```    
    let received_pre_commitments = [[pre_commitments from user 1],..,[pre_commitments from user n]]
    store_pre_commitments(received_pre_commitments)
```

##### step three
User sends each commitments to broker
```
    send_to_broker(commitments)
```

Once the broker receives commitments, broker stores each list received from each user.
```
    let received_commitments = [[commitments from user 1],..,[commitments from user n]]
    // store received_commitments
```

### Signing
##### step one
Initiator prepares transaction and sends it to broker
```
    let transaction = {from: 0xAA, to: 0xBB, ..}
    let encoded_transaction = encode_transaction(transaction)
    send_to_broker(encoded_transaction)
```
##### step two
Once the broker receive transaction signing message from initiator, broker queries nonce of multisig account from zksync
```
    let nonce = query_nonce_from_zksync(ethereum_address);    
```
Broker picks next commitment from each subset 
```
    let current_commitments = []
    for subset in received_commitments
        current_commitments.push(subset[nonce])
    end for
```
Broker queries latest block hash from ethereum network 
```
    let latest_block_hash = query_latest_block_hash()
```
Broker constructs message and sends it to all users
```
    message = { 
        transaction: encoded_transaction, 
        latest_block_hash: latest_block_hash,
        commitment_list: current_commitments,
        nonce: nonce,
    }
    
    for user in all_users
        send_to_user(message, user) 
    end for
    
```

##### step three
Once the user receives transaction signing message from broker, user picks next pre-commitment from each subset 
```
    let current_pre_commitments = []
    for subset in received_pre_commitments
        current_pre_commitments.push(subset[nonce])
    end for
```
User compares received commitments with previously received pre-commitments
```
    for i in len(received_commitments)
        if received_commitments[i] != current_pre_commitments[i]
            exit
        end if
    end for
```

User computes aggregated commitment

```
    let aggregated_commitment = compute_aggregated_commitment(received_commitments)    
```

User signs transaction with each private key and sends them to the broker
```
    let transaction = message.transaction
    let latest_block_hash = message.latest_block_hash
    
    let signature_shares = []
    let public_keys = []
    
    for private_key in private_keys
        let signature_share = sign(private_key, pubkey_list, aggregated_commitment, transaction, latest_block_hash)        
        signature_shares.push(signature_share)
        
        let public_key = compute_pubkey(private_key)
        public_keys.push(public_key)
    end for
    
    let signing_result = {
        signature_shares: signature_shares,
        public_keys: public_keys,
        aggregated_commitment: aggregated_commitment,
    } 
    
    // send signing_result to broker
    send_to_broker(signing_result)
```
##### step four
Once the broker receives all signing results from each user, broker checks that each received aggregated commitments are same
```
    for i in len(messages)
        if i == 0 
            continue
        end if
        let previous_aggregated_commitment = messages[i-1].aggregated_commitment          
        let current_aggregated_commitment = messages[i].aggregated_commitment
        
        if previous_aggregated_commitment != current_aggregated_commitment
            exit
        end if
    end for
    
    let aggregated_commitment = messages[0].aggregated_commitment
```
Broker makes a unique list of received signatures by comparing public keys 
```        
    let current_public_keys = []
    let current_signature_shares = []
    for message in messages
        for i in len(signature_shares)
            if !current_public_keys.has(public_keys[i])
                current_signature_shares.push(signature_shares[i])
            end if
        end for
    end for
```

Broker aggregates signature shares
```
    let aggregated_signature = compute_aggregated_signature(current_signature_shares)
    
    let final_signature = {
        r: aggregated_commitment,
        s: aggregated_signature
    }
```
Broker completes ceremony by submitting  transaction to the zksync if signature is valid
```
    if !is_signature_valid(final_signature)
        exit
    end if
    
    submit_transaction(transaction, final_signature)
```



## Examples
A working full round typescript example in a e2e fashion can be found [here](https://github.com/matter-labs/multisig/blob/master/typescript-example/test/example.test.ts)
This example illustrates only n-of-n scheme. (**It is not for t-of-n scheme!**)

`musig-bindings` directory contains generated wasm-code. Rust sources can be found in [here](https://github.com/matter-labs/schnorr-musig/tree/dev)

### Build
```
cd wasm/typescript-example
yarn -D && yarn build
```

### Test
```
yarn test
```

## References

- [Simple Schnorr Multi-Signatures with Applications to Bitcoin](https://eprint.iacr.org/2018/068.pdf)
- [MuSig: A New Multisignature Standard](https://blockstream.com/2018/01/23/en-musig-key-aggregation-schnorr-signatures/)
- [Key Aggregation for Schnorr Signatures](https://blockstream.com/2018/01/23/en-musig-key-aggregation-schnorr-signatures/)
