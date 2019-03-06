export const SessionStorageService = {
    get(key) {
        return sessionStorage.getItem(key);
    },
    set(key, value) {
        sessionStorage.setItem(key, value);
    },
    remove(key) {
        sessionStorage.removeItem(key);
    },
    clear(key) {
        sessionStorage.removeItem(key);
    },
    delete(key) {
        sessionStorage.removeItem(key);
    },
    clearAll() {
        sessionStorage.clear();
    }
};