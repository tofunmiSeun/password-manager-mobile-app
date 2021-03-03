import CryptoES from 'crypto-es';
import * as Random from 'expo-random';
import { post, get } from './ApiCallsService';
import UserService from './UserService';

async function generateKey(length) {
    var key = ""
    for (var x of await Random.getRandomBytesAsync(length)) {
        key += String.fromCharCode(x);
    }
    return CryptoES.enc.Utf8.parse(key).toString().toUpperCase();
};

export default class VaultService {
    static async generateVaultKey() {
        return await generateKey(32);
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