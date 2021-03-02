import uuid from 'react-native-uuid';
import CryptoES from 'crypto-es';
import RSAKey from 'react-native-rsa';
import * as Random from 'expo-random';
import UserService from './UserService';

async function generateSecretKey() {
    var legalCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var secretKey = ""
    for (var x of await Random.getRandomBytesAsync(24)) {
        secretKey += legalCharacters[x % legalCharacters.length];
    }
    return secretKey;
};

function XOR(first, second, length) {
    first = first.toUpperCase();
    second = second.toUpperCase();
    var validHexadecimals = "0123456789ABCDEF";
    var result = "";
    for (var i = 0; i < length; i++) {
        result += validHexadecimals[validHexadecimals.indexOf(first[i]) ^ validHexadecimals.indexOf(second[i])];
    }
    return result;
}

function generateRsaKeyPairs() {
    var rsa = new RSAKey();
    rsa.generate(256, '10001');
    return {
        privateKey: rsa.getPrivateString(),
        publicKey: rsa.getPublicString()
    };
};

export default class DeviceCredentialsService {

    static async generateAndSaveKeys(masterPassword) {
        var userDetails = await UserService.getUserDetails();
        var mukRandomSalt = uuid.v4();

        var passwordSaltHashFunction = CryptoES.algo.SHA256.create();
        passwordSaltHashFunction.update(mukRandomSalt);
        passwordSaltHashFunction.update(userDetails.email);

        var mixture1 = CryptoES.PBKDF2(masterPassword.trim(), passwordSaltHashFunction.finalize(), {
            keySize: 256 / 32,
            iterations: 100000
        }).toString().toUpperCase();

        var secretKey = await generateSecretKey();
        var rsaKeyPair = generateRsaKeyPairs();

        var mixture2Function = CryptoES.algo.SHA256.create();
        mixture2Function.update(secretKey);
        mixture2Function.update(userDetails.userId);
        var mixture2 = mixture2Function.finalize().toString().toUpperCase();

        var muk = XOR(mixture1, mixture2, 64);
        var encryptedPrivateKey = CryptoES.AES.encrypt(rsaKeyPair.privateKey, muk).toString();

        return {
            secretKey,
            mukSalt: mukRandomSalt,
            publicKey: rsaKeyPair.publicKey,
            encryptedPrivateKey
        };
    };

    static async generateKey(length) {
        var key = ""
        for (var x of await Random.getRandomBytesAsync(length)) {
            key += String.fromCharCode(x);
        }
        return CryptoES.enc.Utf8.parse(key).toString().toUpperCase();
    };

    static async validateDeviceCredentials(device, masterPassword, secretKey) {
        var userDetails = await UserService.getUserDetails();
        var mukRandomSalt = device.mukSalt;

        var passwordSaltHashFunction = CryptoES.algo.SHA256.create();
        passwordSaltHashFunction.update(mukRandomSalt);
        passwordSaltHashFunction.update(userDetails.email);

        var mixture1 = CryptoES.PBKDF2(masterPassword.trim(), passwordSaltHashFunction.finalize(), {
            keySize: 256 / 32,
            iterations: 100000
        }).toString().toUpperCase();

        var mixture2Function = CryptoES.algo.SHA256.create();
        mixture2Function.update(secretKey);
        mixture2Function.update(userDetails.userId);
        var mixture2 = mixture2Function.finalize().toString().toUpperCase();

        var muk = XOR(mixture1, mixture2, 64);
        const decrpytedPrvKey = CryptoES.AES.decrypt(device.encryptedPrivateKey, muk).toString(CryptoES.enc.Utf8);

        var rsa = new RSAKey();
        rsa.setPrivateString(decrpytedPrvKey);
        return rsa.getPublicString() === device.publicKey;
    };
};