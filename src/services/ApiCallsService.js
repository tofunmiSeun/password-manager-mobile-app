import axios from 'axios';

const SERVER_URL = 'http://localhost:9001/api/v1';

export function setAuthorizationToken(token) {
    const authHeaderValue = `Basic ${token}`;
    axios.defaults.headers.post['Authorization'] = authHeaderValue;
    axios.defaults.headers.get['Authorization'] = authHeaderValue;
}

export function post(url, requestBody, successCallback, errorCallback) {
    axios.post(SERVER_URL + url, requestBody)
        .then(response => {
            successCallback(response.data);
        }).catch(error => {
            if (error.response) {
                errorCallback(error.response.data);
            } else {
                errorCallback(error.message);
            }
        });
}

export function get(url, successCallback, errorCallback) {
    axios.get(SERVER_URL + url)
        .then(response => {
            successCallback(response.data);
        }).catch(error => {
            if (error.response) {
                errorCallback(error.response.data);
            } else {
                errorCallback(error.message);
            }
        });
}

export function httpDelete(url, successCallback, errorCallback) {
    axios.delete(SERVER_URL + url)
        .then(response => {
            successCallback(response.data);
        }).catch(error => {
            if (error.response) {
                errorCallback(error.response.data);
            } else {
                errorCallback(error.message);
            }
        });
}