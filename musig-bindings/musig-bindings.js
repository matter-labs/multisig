let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { TextDecoder } = require(String.raw`util`);

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachegetUint32Memory0 = null;
function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory0;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
*/
class MusigBN256WasmAggregatedPubkey {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_musigbn256wasmaggregatedpubkey_free(ptr);
    }
    /**
    * @param {Uint8Array} encoded_pubkeys
    * @returns {Uint8Array}
    */
    static compute(encoded_pubkeys) {
        var ptr0 = passArray8ToWasm0(encoded_pubkeys, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.musigbn256wasmaggregatedpubkey_compute(8, ptr0, len0);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v1;
    }
}
module.exports.MusigBN256WasmAggregatedPubkey = MusigBN256WasmAggregatedPubkey;
/**
*/
class MusigBN256WasmSigner {

    static __wrap(ptr) {
        const obj = Object.create(MusigBN256WasmSigner.prototype);
        obj.ptr = ptr;

        return obj;
    }

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_musigbn256wasmsigner_free(ptr);
    }
    /**
    * @param {Uint8Array} input
    * @param {number} position
    * @returns {MusigBN256WasmSigner}
    */
    static new(input, position) {
        var ptr0 = passArray8ToWasm0(input, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.musigbn256wasmsigner_new(ptr0, len0, position);
        return MusigBN256WasmSigner.__wrap(ret);
    }
    /**
    * @param {Uint32Array} seed
    * @returns {Uint8Array}
    */
    compute_precommitment(seed) {
        var ptr0 = passArray32ToWasm0(seed, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.musigbn256wasmsigner_compute_precommitment(8, this.ptr, ptr0, len0);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v1;
    }
    /**
    * @param {Uint8Array} input
    * @returns {Uint8Array}
    */
    receive_precommitments(input) {
        var ptr0 = passArray8ToWasm0(input, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.musigbn256wasmsigner_receive_precommitments(8, this.ptr, ptr0, len0);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v1;
    }
    /**
    * @param {Uint8Array} input
    * @returns {Uint8Array}
    */
    receive_commitments(input) {
        var ptr0 = passArray8ToWasm0(input, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.musigbn256wasmsigner_receive_commitments(8, this.ptr, ptr0, len0);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v1;
    }
    /**
    * @param {Uint8Array} private_key_bytes
    * @param {Uint8Array} message
    * @returns {Uint8Array}
    */
    sign(private_key_bytes, message) {
        var ptr0 = passArray8ToWasm0(private_key_bytes, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        wasm.musigbn256wasmsigner_sign(8, this.ptr, ptr0, len0, ptr1, len1);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        var v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v2;
    }
    /**
    * @param {Uint8Array} input
    * @returns {Uint8Array}
    */
    receive_signature_shares(input) {
        var ptr0 = passArray8ToWasm0(input, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.musigbn256wasmsigner_receive_signature_shares(8, this.ptr, ptr0, len0);
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        var v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
        return v1;
    }
}
module.exports.MusigBN256WasmSigner = MusigBN256WasmSigner;
/**
*/
class MusigBN256WasmVerifier {

    free() {
        const ptr = this.ptr;
        this.ptr = 0;

        wasm.__wbg_musigbn256wasmverifier_free(ptr);
    }
    /**
    * @param {Uint8Array} message
    * @param {Uint8Array} encoded_pubkeys
    * @param {Uint8Array} encoded_signature
    * @returns {boolean}
    */
    static verify(message, encoded_pubkeys, encoded_signature) {
        var ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray8ToWasm0(encoded_pubkeys, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passArray8ToWasm0(encoded_signature, wasm.__wbindgen_malloc);
        var len2 = WASM_VECTOR_LEN;
        var ret = wasm.musigbn256wasmverifier_verify(ptr0, len0, ptr1, len1, ptr2, len2);
        return ret !== 0;
    }
}
module.exports.MusigBN256WasmVerifier = MusigBN256WasmVerifier;

module.exports.__wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

module.exports.__wbindgen_rethrow = function(arg0) {
    throw takeObject(arg0);
};

const path = require('path').join(__dirname, 'musig-bindings_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

