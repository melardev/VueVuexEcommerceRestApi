import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/services/jwt.service";
import {environment} from "@/config/environment";

const VueAxiosService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = environment.ApiConfig.urls.base;
    },

    setHeader() {
        Vue.axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${JwtService.getToken()}`;
    },

    query(resource, params) {
        return Vue.axios.get(resource, params).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    get(url) {
        return Vue.axios.get(url);
    },

    post(url, body) {
        return Vue.axios.create(url, body);
    },

    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    put(resource, params) {
        return Vue.axios.put(`${resource}`, params);
    },

    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }
};

export default VueAxiosService;

export const TagsService = {
    get() {
        return ApiService.get("tags");
    }
};


export const FavoriteService = {
    add(slug) {
        return ApiService.create(`articles/${slug}/favorite`);
    },
    remove(slug) {
        return ApiService.delete(`articles/${slug}/favorite`);
    }
};
