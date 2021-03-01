import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { post } from '../services/ApiCallsService';

export default class VaultService {
    static getVaults(requestBody, successCallback, errorCallback) {
        get('/user/register', requestBody, (tokenResponse) => {
            saveUserDetails(tokenResponse);
            successCallback();
        }, errorCallback);
    }
}