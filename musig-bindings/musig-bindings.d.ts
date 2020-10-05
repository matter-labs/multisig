/* tslint:disable */
/* eslint-disable */
/**
*/
export class MusigBN256WasmAggregatedPubkey {
  free(): void;
/**
* @param {Uint8Array} encoded_pubkeys
* @returns {Uint8Array}
*/
  static compute(encoded_pubkeys: Uint8Array): Uint8Array;
}
/**
*/
export class MusigBN256WasmSigner {
  free(): void;
/**
* @param {Uint8Array} input
* @param {number} position
* @returns {MusigBN256WasmSigner}
*/
  static new(input: Uint8Array, position: number): MusigBN256WasmSigner;
/**
* @param {Uint32Array} seed
* @returns {Uint8Array}
*/
  compute_precommitment(seed: Uint32Array): Uint8Array;
/**
* @param {Uint8Array} input
* @returns {Uint8Array}
*/
  receive_precommitments(input: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} input
* @returns {Uint8Array}
*/
  receive_commitments(input: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} private_key_bytes
* @param {Uint8Array} message
* @returns {Uint8Array}
*/
  sign(private_key_bytes: Uint8Array, message: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} input
* @returns {Uint8Array}
*/
  receive_signature_shares(input: Uint8Array): Uint8Array;
}
/**
*/
export class MusigBN256WasmVerifier {
  free(): void;
/**
* @param {Uint8Array} message
* @param {Uint8Array} encoded_pubkeys
* @param {Uint8Array} encoded_signature
* @returns {boolean}
*/
  static verify(message: Uint8Array, encoded_pubkeys: Uint8Array, encoded_signature: Uint8Array): boolean;
}
