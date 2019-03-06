import {AddressAction, NotificationAction} from "@/store/types.actions";
import {AddressesAxiosService} from "@/services/remote/addresses.axios.service";

const initialState = {
    isLoading: true,
    page_meta: {},
    addresses: [],
};

const mutations = {
    [AddressAction.local.SET_ADDRESSES](state, data) {
        state.page_meta = data.page_meta;
        state.addresses = data.addresses;
    }
};

const actions = {
    [AddressAction.remote.FETCH_ALL](context) {
        return new Promise(resolve => {
            context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, true, {root: true});
            return AddressesAxiosService.fetchAll().then(response => {
                if (response.data.success) {
                    context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                    context.commit(AddressAction.local.SET_ADDRESSES, {
                        page_meta: response.data.page_meta,
                        addresses: response.data.addresses
                    });
                    resolve(response.data);
                }
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                context.commit(`notifications/${NotificationAction.SET_ERROR}`, err.message, {root: true});
            });
        });

    }
};

const getters = {
    getAddresses: state => state.addresses
};

export const addresses = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};
