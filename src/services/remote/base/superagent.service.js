import superAgentPromise from 'superagent-promise';
import _superagent from 'superagent';

// user superAgentPromise
const superAgentPromise = superAgentPromise(_superagent, global.Promise);
const API_ROOT = 'http://localhost:3000/api';
const encode = encodeURIComponent;
let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
};
const API_URL_BASE = 'http://localhost:8080/api';

const limit = (pageSize, page = 1) => `page_size=${pageSize}&page=${page}`;

// Add headers and token if available
const headersPlugin = req => {
    req.set('Accept', 'application/json');
    req.set('Content-Type', 'application/json');
    if (token) {
        req.set('authorization', `Bearer ${token}`);
    }
};

const rensponseBody = (res) => res.body;

export const SuperAgentService = {
    get: url => superAgentPromise.get(`${API_URL_BASE}${url}`).use(tokenPlugin).then(rensponseBody),
    post: (url, body) => superAgentPromise.create(`${API_URL_BASE}${url}`, body).use(tokenPlugin).then(rensponseBody),
    put: (url, body) => superAgentPromise.put(`${API_URL_BASE}${url}`, body).use(tokenPlugin).then(rensponseBody),
    del: url => superAgentPromise.del(`${API_URL_BASE}${url}`).use(tokenPlugin).then(rensponseBody),
};
