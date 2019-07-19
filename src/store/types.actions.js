export const ProductAction = {
    remote: {
        FETCH_ALL: 'FETCH_ALL',
        FETCH_BY_ID: 'FETCH_BY_ID',
        FETCH_BY_SLUG: 'FETCH_BY_SLUG',
        UPDATE: 'UPDATE',
        CREATE: 'CREATE',
        DELETE: 'DELETE',
        LIKE: 'LIKE',
        UNLIKE: 'UNLIKE'
    },
    local: {
        SET_PRODUCTS: 'SET_PRODUCTS',
        SET_PRODUCT: 'SET_PRODUCT',
    }
};

export const AddressAction = {
    remote: {
        FETCH_ALL: 'FETCH_ALL',
        FETCH_BY_ID: 'FETCH_BY_ID',
        CREATE: 'CREATE',
    },
    local: {
        SET_ADDRESSES: 'SET_ADDRESSES',
    }
};

export const AuthAction = {
    remote: {
        LOGIN: 'LOGIN',
        REGISTER: 'REGISTER',
        IS_VALID_TOKEN: 'IS_VALID_TOKEN',
    },
    local: {
        SET_USER: 'SET_USER',
        LOGOUT: 'LOGOUT',

        IS_REGISTERING: 'IS_REGISTERING',
        IS_LOGGING_IN: 'IS_LOGGING_IN',
        IS_LOGGED_IN: 'IS_LOGGED_IN',
        REGISTER_SUCCESS: 'REGISTER_SUCCESS',
        REGISTER_FAILURE: 'REGISTER_FAILURE',
        LOGIN_SUCCESS: 'LOGIN_SUCCESS',
        LOGIN_FAILURE: 'LOGIN_FAILURE',
    }
};

export const NotificationAction = {
    SET_IS_LOADING: 'SET_IS_LOADING',
    SET_ERROR: 'SET_ERROR',
    INVALID_TOKEN: 'INVALID_TOKEN',

    SHOW_TOAST_SUCCESS: 'SHOW_TOAST_SUCCESS',
    SHOW_TOAST_ERROR: 'SHOW_TOAST_ERROR',
    CLEAR_TOAST: 'CLEAR_TOAST',

    SHOW_ALERT_SUCCESS: 'SHOW_ALERT_SUCCESS',
    SHOW_DIALOG_ERROR: 'SHOW_DIALOG_ERROR',
    CLEAR_ALERT: 'CLEAR_ALERT'

};

export const PagesAction = {
    remote: {
        FETCH_HOME: 'FETCH_HOME',
    },
    local: {
        SET_CATEGORIES: 'SET_CATEGORIES',
        SET_TAGS: 'SET_TAGS',
        SET_HOME_RESULT: 'SET_HOME_RESULT',
    }
};

export const OrderAction = {
    remote: {
        FETCH_ALL: 'FETCH_ALL',
        MAKE_ORDER_REUSING_ADDRESS: 'MAKE_ORDER_REUSING_ADDRESS',
        MAKE_ORDER_WITH_NEW_ADDRESS: 'MAKE_ORDER_WITH_NEW_ADDRESS'
    },
    local: {
        SET_ORDERS: 'SET_ORDERS',
    }
};

export const CartAction = {
    ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART',
    UPDATE_CART_ITEM_QUANTITY: 'UPDATE_CART_ITEM_QUANTITY',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    CLEAR_CART: 'CLEAR_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART'
};
