// utils.js using Web Crypto API (browser compatible)

import { v4 as uuidv4 } from "uuid";

// Converts a string to Uint8Array
function strToArrayBuffer(str) {
    return new TextEncoder().encode(str);
}

// Converts ArrayBuffer to hex string
function bufferToHex(buffer) {
    return [...new Uint8Array(buffer)]
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

// Converts hex string to Uint8Array
function hexToBuffer(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes; // FIXED: return bytes directly, not bytes.buffer
}

// Hash password with SHA-256 → Promise<ArrayBuffer>
async function getKeyFromPassword(password) {
    const data = strToArrayBuffer(password);
    return await crypto.subtle.digest("SHA-256", data);
}

// Generate random 16 bytes hex string
function getRandomBytesString() {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return bufferToHex(arr.buffer);
}

const algorithm = "AES-CBC";
const iv = new Uint8Array(16); // Fixed IV of 16 zeros (same as Node.js example)

// Convert raw key buffer to a CryptoKey
async function importKey(keyBuffer) {
    return await crypto.subtle.importKey("raw", keyBuffer, algorithm, false, [
        "encrypt",
        "decrypt",
    ]);
}

// Encrypt a string using password → returns hex string
async function encryptText(randomString, password) {
    const keyBuffer = await getKeyFromPassword(password);
    const cryptoKey = await importKey(keyBuffer);

    const data = strToArrayBuffer(randomString);
    const encryptedBuffer = await crypto.subtle.encrypt(
        { name: algorithm, iv },
        cryptoKey,
        data
    );

    return bufferToHex(encryptedBuffer);
}

// Decrypt a hex string using password → returns string or null
async function decryptText(encryptedString, password) {
    try {
        const keyBuffer = await getKeyFromPassword(password);
        const cryptoKey = await importKey(keyBuffer);

        const encryptedBuffer = hexToBuffer(encryptedString);
        const decryptedBuffer = await crypto.subtle.decrypt(
            { name: algorithm, iv },
            cryptoKey,
            encryptedBuffer
        );

        return new TextDecoder().decode(decryptedBuffer);
    } catch (err) {
        console.error("Decryption error:", err);
        return null;
    }
}

// Verify password by decrypting and comparing
async function verifyUserPassword(encString, randomString, password) {
    const decrypted = await decryptText(encString, password);
    if (!decrypted) return false;
    return decrypted === randomString;
}

export {
    getKeyFromPassword,
    getRandomBytesString,
    encryptText,
    decryptText,
    uuidv4,
    verifyUserPassword,
};
