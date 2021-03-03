import { Platform } from 'react-native';
import UserService from './UserService';
import SecureKeyValuePairStorage from '../storage/SecureKeyValuePairStorage';
import PlainKeyValuePairStorage from '../storage/PlainKeyValuePairStorage';
import { post, get } from './ApiCallsService';

const DEVICE_DETAILS_KEY = 'REGISTERED_DEVICE_CREDENTIALS';

export default class DeviceService {

    static async isDeviceRegistered() {
        return Platform.OS !== 'web' ? SecureKeyValuePairStorage.containsKey(DEVICE_DETAILS_KEY) :
            PlainKeyValuePairStorage.containsKey(DEVICE_DETAILS_KEY);
    };

    static async saveDeviceRegistrationCredentials(credentials) {
        var x = JSON.stringify(credentials);
        Platform.OS !== 'web' ? SecureKeyValuePairStorage.save(DEVICE_DETAILS_KEY, x) :
            PlainKeyValuePairStorage.save(DEVICE_DETAILS_KEY, x);
    }

    static async getDeviceDetails() {
        var deviceDetails = await (Platform.OS !== 'web' ? SecureKeyValuePairStorage.get(DEVICE_DETAILS_KEY) :
            PlainKeyValuePairStorage.get(DEVICE_DETAILS_KEY));
        return JSON.parse(deviceDetails);
    }

    static async getAllDevices(successCallback, errorCallback) {
        await UserService.setAuthToken();
        get('/device', (devices) => {
            successCallback(devices);
        }, errorCallback);
    }

    static async uploadDeviceCredentials(requestBody, successCallback, errorCallback) {
        await UserService.setAuthToken();
        post('/device', requestBody, (deviceId) => {
            successCallback(deviceId);
        }, errorCallback);
    }
};