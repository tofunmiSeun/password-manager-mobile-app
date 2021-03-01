import { Platform } from 'react-native';
import { setAuthorizationToken, post } from '../services/ApiCallsService';
import PlainKeyValuePairStorage from '../storage/PlainKeyValuePairStorage';
import SecureKeyValuePairStorage from '../storage/SecureKeyValuePairStorage';

const USER_TOKEN_KEY = 'LOGGED_IN_USER_TOKEN';

export default class UserService {
    static async isLoggedIn() {
        return Platform.OS !== 'web' ? SecureKeyValuePairStorage.containsKey(USER_TOKEN_KEY) :
            PlainKeyValuePairStorage.containsKey(USER_TOKEN_KEY);
    }

    static async saveUserDetails(tokenResponse) {
        var responseString = JSON.stringify(tokenResponse);
        Platform.OS !== 'web' ? SecureKeyValuePairStorage.save(USER_TOKEN_KEY, responseString) :
            PlainKeyValuePairStorage.save(USER_TOKEN_KEY, responseString);
    }

    static async getUserDetails() {
        var userDetails = await (Platform.OS !== 'web' ? SecureKeyValuePairStorage.get(USER_TOKEN_KEY) :
            PlainKeyValuePairStorage.get(USER_TOKEN_KEY));
        return JSON.parse(userDetails);
    }

    static async setAuthToken() {
        var userDetails = await this.getUserDetails();
        setAuthorizationToken(userDetails.token);
    }

    static async clearUserDetails() {
        Platform.OS !== 'web' ? SecureKeyValuePairStorage.delete(USER_TOKEN_KEY) :
            PlainKeyValuePairStorage.delete(USER_TOKEN_KEY);
    }

    static logout() {
        this.clearUserDetails();
    }

    static signUp(requestBody, successCallback, errorCallback) {
        post('/user/register', requestBody, (tokenResponse) => {
            this.onUserTokenRecieved(tokenResponse, successCallback);
        }, errorCallback);
    }

    static login(requestBody, successCallback, errorCallback) {
        post('/user/login', requestBody, (tokenResponse) => {
            this.onUserTokenRecieved(tokenResponse, successCallback);
        }, errorCallback);
    }

    static onUserTokenRecieved(tokenResponse, successCallback) {
        this.saveUserDetails(tokenResponse);
        successCallback();
    }
};