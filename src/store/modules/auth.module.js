import {AuthAction, NotificationAction} from '../types.actions'
import {JwtService} from "@/services/local/jwt.service";
import {UsersService} from "@/services/local/users.service";


const state = {
    isLoggedIn: !!JwtService.getToken(),
    isRegistering: false,
    isLoggingIn: false,
    user: {},
    errors: {}
};

const mutations = {
    //[AuthAction.local.SET_USER](state, user) {
    'SET_USER'(state, user) {
        JwtService.saveUser(user);
        state.isLoggedIn = true;
        state.user = user;
        state.errors = {};
    },

    [AuthAction.local.LOGOUT](state) {
        JwtService.clearSession();
        state.isLoggedIn = false;
        state.user = {};
        state.errors = {};
    },
    'IS_REGISTERING'(state, boolean) {
        state.isRegistering = boolean;
    },

    [AuthAction.local.IS_LOGGING_IN](state, boolean) {
        state.isLoggingIn = boolean;
    },
    [AuthAction.local.IS_LOGGED_IN](state, boolean) {
        state.isLoggedIn = boolean;
    }
};

const actions = {
    [AuthAction.remote.LOGIN](context, loginDto) {
        return new Promise((resolve, reject) => {
            context.commit(AuthAction.local.IS_LOGGING_IN, true);
            UsersService.login(loginDto)
                .then(({data}) => {
                    if (data.success) {
                        context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Logged in successfully', {root: true});
                        context.commit(AuthAction.local.IS_LOGGING_IN, false);
                        context.commit(AuthAction.local.IS_LOGGED_IN, true);
                        // append the token to the user object
                        data.user.token = data.token;
                        context.commit(AuthAction.local.SET_USER, data.user);
                        // context.commit(AuthAction.local.LOGIN_SUCCESS, data.user);
                        resolve(data);
                    } else {
                        reject({success: false, full_messages: data.full_messages});
                    }
                })
                .catch(error => {
                    context.commit(AuthAction.local.LOGIN_FAILURE, error.message);
                    reject({success: false, full_messages: [error.message]});
                });
        });
    },

    [AuthAction.local.LOGOUT](context) {
        return new Promise((resolve, reject) => {
            context.commit(AuthAction.local.LOGOUT);
            context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Logged out successfully', {root: true});
            resolve({success: true});
        });
    },

    [AuthAction.remote.REGISTER](context, registerDto) {
        return new Promise((resolve, reject) => {
            context.commit(AuthAction.local.IS_REGISTERING, true);
            UsersService.register(registerDto)
                .then((response) => {
                    if (response.data.success) {
                        context.commit(AuthAction.local.IS_REGISTERING, false);
                        context.commit(AuthAction.local.REGISTER_SUCCESS, response.data);
                    }
                    resolve(response.data);
                })
                .catch(({response}) => {
                    context.commit(AuthAction.local.REGISTER_FAILURE, response.data.errors);
                    reject(response);
                });
        });
    },
};

const getters = {
    isLoggedIn: (state) => {
        return state.isLoggedIn;
    },
    currentUser: (state) => {
        if (state && state.user) {
            return state.user;
        } else {
            return {};
        }
    }
};

export const auth = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
