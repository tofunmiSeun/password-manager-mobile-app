import uuid from 'react-native-uuid';
import * as CryptoJS from 'crypto-js';
import RSAKey from 'react-native-rsa';
import * as Random from 'expo-random';
import UserService from './UserService';

export default class DeviceCredentialsService {

    static async generateAndSaveKeys(masterPassword) {
        var userDetails = await UserService.getUserDetails();
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
        console.log(rsaKeyPair.privateKey);

        var mixture2Function = CryptoJS.algo.SHA256.create();
        mixture2Function.update(secretKey);
        mixture2Function.update(userDetails.userId);
        var mixture2 = mixture2Function.finalize().toString().toUpperCase();

        var muk = this.XOR(mixture1, mixture2, 64);
        var encryptedPrivateKey = CryptoJS.AES.encrypt(rsaKeyPair.privateKey, muk).toString();

        return {
            secretKey,
            mukSalt: mukRandomSalt,
            publicKey: rsaKeyPair.publicKey,
            encryptedPrivateKey
        };
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

    static async validateDeviceCredentials(device, masterPassword, secretKey) {
        var userDetails = await UserService.getUserDetails();
        var mukRandomSalt = device.mukSalt;

        var passwordSaltHashFunction = CryptoJS.algo.SHA256.create();
        passwordSaltHashFunction.update(mukRandomSalt);
        passwordSaltHashFunction.update(userDetails.email);

        var mixture1 = CryptoJS.PBKDF2(masterPassword.trim(), passwordSaltHashFunction.finalize(), {
            keySize: 256 / 32,
            iterations: 100000
        }).toString().toUpperCase();

        var mixture2Function = CryptoJS.algo.SHA256.create();
        mixture2Function.update(secretKey);
        mixture2Function.update(userDetails.userId);
        var mixture2 = mixture2Function.finalize().toString().toUpperCase();

        var muk = this.XOR(mixture1, mixture2, 64);
        const decrpytedPrvKey = CryptoJS.AES.decrypt(device.encryptedPrivateKey, muk).toString(CryptoJS.enc.Utf8);

        var rsa = new RSAKey();
        rsa.setPrivateString(decrpytedPrvKey);
        return rsa.getPublicString() === device.publicKey;
    };
};