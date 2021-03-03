import CryptoES from 'crypto-es';
import * as Random from 'expo-random';
import RSAKey from 'react-native-rsa';
import { post, get } from './ApiCallsService';
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

export default class VaultService {
    static async generateVaultKey() {
        return await generateKey(32);
    }

    static async encryptVaultKey(masterPassword, device, plainVaultKey) {
        await decryptAndValidatePrivateKey(masterPassword, device);
        const rsa = new RSAKey();
        rsa.setPublicString(device.publicKey);
        return rsa.encrypt(plainVaultKey);
    }

    static async decryptVaultKey(masterPassword, device, cipherVaultKey) {
        var decryptedPrivateKey = await decryptAndValidatePrivateKey(masterPassword, device);
        const rsa = new RSAKey();
        rsa.setPrivateString(decryptedPrivateKey);
        return rsa.decrypt(cipherVaultKey);
    }

    static getVaults(successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            get('/vault', successCallback, errorCallback);
        });
    }

    static createVault(requestBody, successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            post('/vault', requestBody, successCallback, errorCallback);
        });
    }
}