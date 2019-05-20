import config from 'config';
import authHeader from '../_helpers/auth-header';

const axios = require('axios');

export const userService = {
    login,
    logout,
    getAll,
    register
};

function login(username, password) {
    return axios({
            method: 'POST',
            url: `/users/generate-token`,
            baseURL: `${config.apiUrl}`,
            data: {
                'email': username,
                'password': password
            }
        })
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        }).catch(e => {
            throw e;
        });
}

function register(data) {    
    return axios({
            method: 'POST',
            url: `/users/register`,
            baseURL: `${config.apiUrl}`,
            data: data
        })
        .then(handleResponse)
        .catch(e => {
            throw e;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    return axios({
            method: 'GET',
            url: `/chat/online-users`,
            baseURL: `${config.apiUrl}`,
            headers: authHeader()
        })
        .then(handleResponse);
}

function handleResponse(response) {
    const data = response.data;
    if (!response.statusText == 'OK') {
        if (response.status === 401) {
            // auto logout if 401 response returned from api
            logout();
            location.reload(true);
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}