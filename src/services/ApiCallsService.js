import axios from 'axios';

const SERVER_URL = 'http://localhost:9001/api/v1';

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