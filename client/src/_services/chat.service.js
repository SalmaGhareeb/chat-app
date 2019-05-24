import config from 'config';
import authHeader from '../_helpers/auth-header';

const axios = require('axios');

export const chatService = {
    publicRooms,
    create
};


function publicRooms() {
    return axios({
        method: 'GET',
        url: `/chat/public`,
        baseURL: `${config.apiUrl}`,
        'headers': authHeader()
    })
        .then(handleResponse)
        .then(chats => {
            localStorage.setItem('chats', JSON.stringify(chats));
            return chats;
        }).catch(e => {
            throw e;
        });
}

function create(data) {
    return axios({
        method: 'POST',
        url: `/chat/create`,
        baseURL: `${config.apiUrl}`,
        'headers': authHeader(),
        data: data
    })
        .then(handleResponse)
        .catch(e => {
            throw e;
        });
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