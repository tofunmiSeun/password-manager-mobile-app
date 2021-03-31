import { setAuthorizationToken, post } from '../services/ApiCallsService';
import KeyValuePairStorage from '../storage/KeyValuePairStorage';

const USER_TOKEN_KEY = 'LOGGED_IN_USER_TOKEN';

export default class UserService {
    static async isLoggedIn() {
        return KeyValuePairStorage.containsKey(USER_TOKEN_KEY);
    }

    static async saveUserDetails(tokenResponse) {
        var responseString = JSON.stringify(tokenResponse);
        KeyValuePairStorage.save(USER_TOKEN_KEY, responseString);
    }

    static async getUserDetails() {
        var userDetails = await KeyValuePairStorage.get(USER_TOKEN_KEY);
        return JSON.parse(userDetails);
    }

    static async setAuthToken() {
        var userDetails = await this.getUserDetails();
        setAuthorizationToken(userDetails.token);
    }

    static async clearUserDetails() {
        KeyValuePairStorage.delete(USER_TOKEN_KEY);
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