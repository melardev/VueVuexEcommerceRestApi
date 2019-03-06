import {NotificationAction} from "@/store/types.actions";

const state = {
    showModal: false,
    showPopupCart: false,
    isLoading: false,
    messages: {
        messageClass: '',
        message: '',
        timeoutEvent: null,
    },

    toast: {message: '', class_name: ''},
    alert: {message: '', class_name: ''}
};

const mutations = {

    SHOW_MODAL: (state) => {
        state.showModal = !state.showModal;
    },
    TOGGLE_POPUP_CART: (state) => {
        state.showPopupCart = !state.showPopupCart;
    },
    'CLEAR_MESSAGE'(state) {
        state.messageGroup = {
            messageClass: '',
            message: ''
        }
    },
    'SET_IS_LOADING'(state, boolean) {
        state.isLoading = boolean;
    },
    [NotificationAction.SHOW_TOAST_SUCCESS](state, message) {
        state.toast = {class_name: 'alert alert-success', message};
    },
    [NotificationAction.SHOW_TOAST_ERROR](state, message) {
        state.toast = {class_name: 'alert alert-danger', message};
    },
    [NotificationAction.CLEAR_TOAST](state) {
        state.toast = {message: '', class_name: ''};
    },
    [NotificationAction.SHOW_ALERT_SUCCESS](state, message) {
        state.alert = {class_name: 'alert alert-success', message};
    },
    [NotificationAction.SHOW_DIALOG_ERROR](state, message) {
        state.alert = {class_name: 'alert alert-danger', message};
    },
    [NotificationAction.CLEAR_ALERT](state) {
        state.alert = {message: '', class_name: ''};
    }
};

const actions = {
    showOrHiddenModal: (context) => {
        context.commit('SHOW_MODAL');
    },
    togglePopupCart: (context) => {
        context.commit('TOGGLE_POPUP_CART');
    },

    clearMessage({commit}) {
        commit('CLEAR_MESSAGE');
    }
};

const getters = {

    getShowModal: state => state.showModal,
    shouldShowCartDialog: state => state.showPopupCart,
    isAppLoading: state => state.isLoading,
    getMessages: state => state.messages,

    getToast: (state) => state.toast,
    getToastMessage: (state) => state.toast.message,
    getToastClassName: (state) => state.toast.class_name,

    getAlert: (state) => state.alert,
    getAlertMessage: (state) => state.alert.message,
    getDialogClassName: (state) => state.class_name,
};

export const notifications = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
