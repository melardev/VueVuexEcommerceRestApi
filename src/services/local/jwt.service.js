import {LocalStorageService} from "@/services/local/base/local-storage.service";

const USER_KEY = 'user';

export class JwtService {

    static getToken() {
        const user = LocalStorageService.get('user');
        return user ? user.token : null;
    }

    static saveUser(user) {
        LocalStorageService.set(USER_KEY, JSON.stringify(user));
    }

    static getUser() {
        return JSON.parse(LocalStorageService.get(USER_KEY));
    }

    static clearSession() {
        LocalStorageService.clear(USER_KEY);
    }

    static isAuthenticated() {
        return this.getUser() != null;
    }

    static isNotAuthenticated() {
        return !this.isAuthenticated();
    }
}
