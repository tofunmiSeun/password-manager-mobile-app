import CryptoES from 'crypto-es';
import * as Random from 'expo-random';
import RSAKey from 'react-native-rsa';
import { post, get, httpDelete } from './ApiCallsService';
import UserService from './UserService';
import DeviceCredentialsService from './DeviceCredentialsService';

async function generateKey(length) {
    var key = ""
    for (var x of await Random.getRandomBytesAsync(length)) {
        key += String.fromCharCode(x);
    }
    return CryptoES.enc.Utf8.parse(key).toString().toUpperCase();
};

async function decryptAndValidatePrivateKey(masterPassword, device) {
    const userDetails = await UserService.getUserDetails();
    const muk = DeviceCredentialsService.getMUK(masterPassword, device.secretKey, device.mukSalt, userDetails);
    var decryptedPrivateKey = await DeviceCredentialsService.decryptPrivateKey(muk, device.encryptedPrivateKey);
    const isValid = await DeviceCredentialsService.verifyKeyPair(decryptedPrivateKey, device.publicKey);
    if (!isValid) {
        throw 'Could not successfully access user\'s keys';
    }
    return decryptedPrivateKey;
}

function AESEncrypt(key, plain) {
    return CryptoES.AES.encrypt(plain, key).toString()
}

function AESDecrypt(key, cipher) {
    return CryptoES.AES.decrypt(cipher, key).toString(CryptoES.enc.Utf8)
}

export default class VaultService {
    static async generateAndEncryptVaultKey(masterPassword, device) {
        return this.encryptVaultKey(masterPassword, device, await generateKey(32));
    }

    static async encryptVaultKey(masterPassword, device, plainVaultKey) {
        await decryptAndValidatePrivateKey(masterPassword, device);
        const rsa = new RSAKey();
        rsa.setPublicString(device.publicKey);
        return rsa.encrypt(plainVaultKey).toUpperCase();
    }

    static async decryptVaultKey(masterPassword, device, cipherVaultKey) {
        var decryptedPrivateKey = await decryptAndValidatePrivateKey(masterPassword, device);
        const rsa = new RSAKey();
        rsa.setPrivateString(decryptedPrivateKey);
        return rsa.decrypt(cipherVaultKey);
    }

    static encryptVaultRecord(vaultKey, plainRecord) {
        return Object.assign(plainRecord, {
            name: AESEncrypt(vaultKey, plainRecord.name),
            url: AESEncrypt(vaultKey, plainRecord.url),
            username: AESEncrypt(vaultKey, plainRecord.username),
            password: AESEncrypt(vaultKey, plainRecord.password),
        });
    }

    static decryptVaultRecord(vaultKey, encryptedRecord) {
        return Object.assign(encryptedRecord, {
            name: AESDecrypt(vaultKey, encryptedRecord.name),
            url: AESDecrypt(vaultKey, encryptedRecord.url),
            username: AESDecrypt(vaultKey, encryptedRecord.username),
            password: AESDecrypt(vaultKey, encryptedRecord.password),
        });
    }

    static createVault(requestBody, successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            post('/vault', requestBody, successCallback, errorCallback);
        });
    }

    static getVaults(deviceId, successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            get(`/vault/for-device/${deviceId}`, successCallback, errorCallback);
        });
    }

    static editVault(vaultId, requestBody, successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            post(`/vault/edit/${vaultId}`, requestBody, successCallback, errorCallback);
        });
    }

    static getVaultKey(vaultId, deviceId, successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            get(`/vault-key/for-vault/${vaultId}/for-device/${deviceId}`, successCallback, errorCallback);
        });
    }

    static createVaultRecord(vaultId, requestBody, successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            post(`/vault-record/create/${vaultId}`, requestBody, successCallback, errorCallback);
        });
    }

    static getVaultRecords(vaultId, successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            get(`/vault-record/for-vault/${vaultId}`, successCallback, errorCallback);
        });
    }

    static editVaultRecord(vaultRecordId, requestBody, successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            post(`/vault-record/edit/${vaultRecordId}`, requestBody, successCallback, errorCallback);
        });
    }

    static deleteVaultRecord(vaultRecordId, successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            post(`/vault-record/delete/${vaultRecordId}`, successCallback, errorCallback);
        });
    }
}