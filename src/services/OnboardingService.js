import { Platform } from 'react-native';
import { post } from '../services/ApiCallsService';
import PlainKeyValuePairStorage from '../storage/PlainKeyValuePairStorage';
import SecureKeyValuePairStorage from '../storage/SecureKeyValuePairStorage';

const USER_TOKEN_KEY = 'LOGGED_IN_USER_TOKEN';
const USER_NAME_KEY = 'LOGGED_IN_USER_NAME';

export async function isLoggedIn() {
    return Platform.OS !== 'web' ? SecureKeyValuePairStorage.containsKey(USER_TOKEN_KEY) :
        PlainKeyValuePairStorage.containsKey(USER_TOKEN_KEY);
}

export async function saveUserDetails(token, name) {
    PlainKeyValuePairStorage.save(USER_NAME_KEY, name);
    Platform.OS !== 'web' ? SecureKeyValuePairStorage.save(USER_TOKEN_KEY, token) :
        PlainKeyValuePairStorage.save(USER_TOKEN_KEY, token);
}

export async function clearUserToken() {
    Platform.OS !== 'web' ? SecureKeyValuePairStorage.delete(USER_TOKEN_KEY) :
        PlainKeyValuePairStorage.delete(USER_TOKEN_KEY);
}

export function signUp(requestBody, successCallback, errorCallback) {
    post('/user/register', requestBody, (tokenResponse) => {
        saveUserDetails(tokenResponse.token, tokenResponse.name);
        successCallback();
    }, errorCallback);
}

export function login(requestBody, successCallback, errorCallback) {
    post('/user/login', requestBody, (tokenResponse) => {
        saveUserDetails(tokenResponse.token, tokenResponse.name);
        successCallback();
    }, errorCallback);
}