import UserService from './UserService';
import KeyValuePairStorage from '../storage/KeyValuePairStorage';
import { post, get } from './ApiCallsService';

const DEVICE_DETAILS_KEY = 'REGISTERED_DEVICE_CREDENTIALS';

export default class DeviceService {

    static async isDeviceRegistered() {
        return KeyValuePairStorage.containsKey(DEVICE_DETAILS_KEY);
    };

    static async saveDeviceRegistrationCredentials(credentials) {
        var x = JSON.stringify(credentials);
        KeyValuePairStorage.save(DEVICE_DETAILS_KEY, x);
    }

    static async getDeviceDetails() {
        var deviceDetails = await KeyValuePairStorage.get(DEVICE_DETAILS_KEY);
        return JSON.parse(deviceDetails);
    }

    static async getDeviceId() {
        var deviceDetails = await this.getDeviceDetails();
        return deviceDetails.deviceId;
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