import {NotificationAction, PagesAction} from "@/store/types.actions";
import {PagesAxiosService} from "@/services/remote/pages.axios.service";

const initialState = {
    isLoading: true,
    categories: [],
    tags: [],
};

const mutations = {
    [PagesAction.local.SET_TAGS](state, data) {
        state.page_meta = data.page_meta;
        state.products = data.products;
    },
    [PagesAction.local.SET_CATEGORIES](state, data) {
        state.page_meta = data.page_meta;
        state.products = data.products;
    },
    'SET_HOME_RESULT'(state, data) {
        state.tags = data.tags;
        state.categories = data.categories;
    }

};

const actions = {
    [PagesAction.remote.FETCH_HOME](context) {
        return new Promise(resolve => {
            context.commit('notifications/' + NotificationAction.SET_IS_LOADING, true, {root: true});
            return PagesAxiosService.fetchHome().then(({data}) => {
                if (data.success) {
                    context.commit('notifications/' + NotificationAction.SET_IS_LOADING, false, {root: true});
                    context.commit(PagesAction.local.SET_HOME_RESULT, data);
                    resolve(data);
                }
            }).catch(err => {
                debugger;
                context.commit('notifications/' + NotificationAction.SET_IS_LOADING, false, {root: true});
                context.commit('notifications/' + NotificationAction.SET_ERROR, err.message, {root: true});
            });
        });

    }
};

const getters = {
    getAllCategories: state => state.categories,
    getAllTags: state => state.tags,
};

export const pages = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};
