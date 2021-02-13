import { Platform } from 'react-native';
import uuid from 'react-native-uuid';
import * as CryptoJS from 'crypto-js';
import RSAKey from 'react-native-rsa';
import * as Random from 'expo-random';
import { getUserDetails } from '../services/OnboardingService';
import SecureKeyValuePairStorage from '../storage/SecureKeyValuePairStorage';
import PlainKeyValuePairStorage from '../storage/PlainKeyValuePairStorage';


const DEVICE_DETAILS_KEY = 'REGISTERED_DEVICE_CREDENTIALS';

export default class DeviceRegistrationService {

    static async isDeviceRegistered() {
        return Platform.OS !== 'web' ? SecureKeyValuePairStorage.containsKey(DEVICE_DETAILS_KEY) :
            PlainKeyValuePairStorage.containsKey(DEVICE_DETAILS_KEY);
    };

    static async saveDeviceRegistrationCredentials(credentials) {
        var x = JSON.stringify(credentials);
        Platform.OS !== 'web' ? SecureKeyValuePairStorage.save(DEVICE_DETAILS_KEY, x) :
            PlainKeyValuePairStorage.save(DEVICE_DETAILS_KEY, x);
    }

    static async generateAndSaveKeys(masterPassword) {
        var userDetails = await getUserDetails();
        var mukRandomSalt = uuid.v4();

        var passwordSaltHashFunction = CryptoJS.algo.SHA256.create();
        passwordSaltHashFunction.update(mukRandomSalt);
        passwordSaltHashFunction.update(userDetails.email);

        var mixture1 = CryptoJS.PBKDF2(masterPassword.trim(), passwordSaltHashFunction.finalize(), {
            keySize: 256 / 32,
            iterations: 100000
        }).toString().toUpperCase();

        var secretKey = await this.generateSecretKey();
        var rsaKeyPair = this.generateRsaKeyPairs();

        var mixture2Function = CryptoJS.algo.SHA256.create();
        mixture2Function.update(secretKey);
        mixture2Function.update(userDetails.userId);
        var mixture2 = mixture2Function.finalize().toString().toUpperCase();

        var muk = this.XOR(mixture1, mixture2, 64);
        var encryptedPrivateKey = CryptoJS.AES.encrypt(rsaKeyPair.privateKey, muk).toString();

        var toSaveLocally = {
            secretKey,
            mukSalt: mukRandomSalt,
            publicKey: rsaKeyPair.publicKey,
            encryptedPrivateKey
        };
        this.saveDeviceRegistrationCredentials(toSaveLocally);
        return toSaveLocally;
    };

    static async generateSecretKey() {
        var legalCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var secretKey = ""
        for (var x of await Random.getRandomBytesAsync(24)) {
            secretKey += legalCharacters[x % legalCharacters.length];
        }
        return secretKey;
    };

    static XOR(first, second, length) {
        first = first.toUpperCase();
        second = second.toUpperCase();
        var validHexadecimals = "0123456789ABCDEF";
        var result = "";
        for (var i = 0; i < length; i++) {
            result += validHexadecimals[validHexadecimals.indexOf(first[i]) ^ validHexadecimals.indexOf(second[i])];
        }
        return result;
    }

    static async generateKey(length) {
        var key = ""
        for (var x of await Random.getRandomBytesAsync(length)) {
            key += String.fromCharCode(x);
        }
        return CryptoJS.enc.Utf8.parse(key).toString().toUpperCase();
    };

    static generateRsaKeyPairs() {
        var rsa = new RSAKey();
        rsa.generate(256, '10001');
        return {
            privateKey: rsa.getPrivateString(),
            publicKey: rsa.getPublicString()
        };
    };
};