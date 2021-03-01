import { get } from './ApiCallsService';
import UserService from './UserService';

export default class VaultService {
    static getVaults(requestBody, successCallback, errorCallback) {
        UserService.setAuthToken().then(() => {
            get('/vault', successCallback, errorCallback);
        });
    }
}