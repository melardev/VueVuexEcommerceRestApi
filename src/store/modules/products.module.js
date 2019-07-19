import {NotificationAction, ProductAction} from "@/store/types.actions";
import {ProductsAxiosService} from "@/services/remote/products.axios.service";


function stripResponse(response) {
    // All my server application return success(boolean) and full_messages(array)
    // We do not want them to be stored in the state, so let's delete them
    delete response.success;
    delete response.full_messages;
    return response;
}

const initialState = {
    isLoading: true,
    page_meta: {},
    products: [],
};

const mutations = {
    'UPDATE_PRODUCT_LIST'(state, productList) {
        state.productList = productList;
        state.isLoading = false;
    },
    [ProductAction.local.SET_PRODUCTS](state, data) {
        state.page_meta = data.page_meta;
        state.products = data.products;
    }
};

const actions = {
    [ProductAction.remote.FETCH_ALL](context, args) {
        return new Promise(resolve => {
            context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, true, {root: true});
            return ProductsAxiosService.fetchAll(args).then(response => {
                if (response.data.success) {
                    context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                    context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Products Loaded fetched successfully', {root: true});
                    context.commit(ProductAction.local.SET_PRODUCTS, {
                        page_meta: response.data.page_meta,
                        products: response.data.products
                    });
                    resolve(response.data);
                }
            }).catch(err => {
                context.commit(NotificationAction.SET_IS_LOADING, false);
                context.commit(NotificationAction.SET_ERROR, err.message);
            });
        });

    },

    [ProductAction.remote.FETCH_BY_SLUG](context, slug) {
        return new Promise((resolve, reject) => {
            ProductsAxiosService.fetchBySlug(slug).then(res => {
                if (res.data && res.data.success) {
                    context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, res.data.full_messages.length > 0 ? res.data.full_messages[0] : 'Product fetched!', {root: true});
                    const product = stripResponse(res.data);
                    return resolve({success: true, product});
                }
                return reject({success: false, full_messages: res.data.full_messages});
            }).catch(err => {
                debugger;
                context.commit(NotificationAction.SHOW_TOAST_ERROR, err.message);
                return reject({success: false, full_messages: [err.message]});
            });
        });
    },
    [ProductAction.remote.CREATE](context, product) {
        return new Promise((resolve, reject) => {
            ProductsAxiosService.create(product).then(res => {
                if (res.data && res.data.success) {
                    context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, res.data.full_messages.length > 0 ? res.data.full_messages[0] : 'Product fetched!', {root: true});
                    const product = stripResponse(res.data);
                    return resolve({success: true, product});
                }
                return reject({success: false, full_messages: res.data.full_messages});
            }).catch(err => {
                debugger;
                context.commit(NotificationAction.SHOW_TOAST_ERROR, err.message);
                return reject({success: false, full_messages: [err.message]});
            });
        });
    },
};

const getters = {


    getAllProducts: state => {
        return state.products;
//  return state.notebooks.concat(initialState.smartphones);
    },
    getPageMeta: state => state.page_meta,

    getProductBySlug: state => slug => state.products.find(p => p.slug === slug)
};

export const products = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};
