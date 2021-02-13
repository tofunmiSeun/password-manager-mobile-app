import { Platform } from 'react-native';
import { post } from '../services/ApiCallsService';
import PlainKeyValuePairStorage from '../storage/PlainKeyValuePairStorage';
import SecureKeyValuePairStorage from '../storage/SecureKeyValuePairStorage';

const USER_TOKEN_KEY = 'LOGGED_IN_USER_TOKEN';

export async function isLoggedIn() {
    return Platform.OS !== 'web' ? SecureKeyValuePairStorage.containsKey(USER_TOKEN_KEY) :
        PlainKeyValuePairStorage.containsKey(USER_TOKEN_KEY);
}

export async function saveUserDetails(tokenResponse) {
    var responseString = JSON.stringify(tokenResponse);
    Platform.OS !== 'web' ? SecureKeyValuePairStorage.save(USER_TOKEN_KEY, responseString) :
        PlainKeyValuePairStorage.save(USER_TOKEN_KEY, responseString);
}

export async function getUserDetails() {
    var userDetails = await(Platform.OS !== 'web' ? SecureKeyValuePairStorage.get(USER_TOKEN_KEY) :
        PlainKeyValuePairStorage.get(USER_TOKEN_KEY));
    return JSON.parse(userDetails);
}

export async function clearUserDetails() {
    Platform.OS !== 'web' ? SecureKeyValuePairStorage.delete(USER_TOKEN_KEY) :
        PlainKeyValuePairStorage.delete(USER_TOKEN_KEY);
}

export function signUp(requestBody, successCallback, errorCallback) {
    post('/user/register', requestBody, (tokenResponse) => {
        saveUserDetails(tokenResponse);
        successCallback();
    }, errorCallback);
}

export function login(requestBody, successCallback, errorCallback) {
    post('/user/login', requestBody, (tokenResponse) => {
        saveUserDetails(tokenResponse);
        successCallback();
    }, errorCallback);
}