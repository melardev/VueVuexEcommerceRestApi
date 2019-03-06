export const LocalStorageService = {
    get(key) {
        return localStorage.getItem(key);
    },
    set(key, value) {
        localStorage.setItem(key, value);
    },
    remove(key) {
        localStorage.removeItem(key);
    },
    clear(key) {
        localStorage.removeItem(key);
    },
    delete(key) {
        localStorage.removeItem(key);
    },
    removeItem(key) {
        localStorage.removeItem(key);
    },
    deleteItem(key) {
        localStorage.removeItem(key);
    },
};
