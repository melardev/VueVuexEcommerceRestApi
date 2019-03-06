import {NotificationAction, OrderAction} from "@/store/types.actions";
import {OrdersAxiosService} from "@/services/remote/orders.axios.service";

const initialState = {
    isLoading: true,
    page_meta: {},
    orders: [],
};

const mutations = {
    [OrderAction.local.SET_ORDERS](state, data) {
        state.page_meta = data.page_meta;
        state.orders = data.orders;
    }
};

const actions = {
    [OrderAction.remote.FETCH_ALL](context) {
        return new Promise(resolve => {
            context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, true, {root: true});
            return OrdersAxiosService.fetchAll().then(response => {
                if (response.data.success) {
                    context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Orders fetched!', {root: true});
                    context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                    context.commit(OrderAction.local.SET_ORDERS, {
                        page_meta: response.data.page_meta,
                        orders: response.data.orders
                    });
                    resolve(response.data);
                }
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                context.commit(NotificationAction.SHOW_TOAST_ERROR, err.message,{root:true});
            });
        });

    },
    [OrderAction.remote.MAKE_ORDER_REUSING_ADDRESS](context, {cart_items, address_id}) {
        return new Promise(resolve => {
            context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, true, {root: true});
            return OrdersAxiosService.checkoutReusingAddress(cart_items, address_id).then(response => {
                if (response.data.success) {
                    context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Order placed successfully!', {root: true});
                    context.dispatch("cart/CLEAR_CART", false, {root: true});
                    context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});

                    resolve(response.data);
                }
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                context.commit(`notifications/${NotificationAction.SET_ERROR}`, err.message);
            });
        });
    },
    [OrderAction.remote.MAKE_ORDER_WITH_NEW_ADDRESS](context, {cart_items, address}) {
        return new Promise(resolve => {
            context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, true, {root: true});
            return OrdersAxiosService.checkoutWithNewAddress(cart_items, address).then(response => {
                if (response.data.success) {
                    context.commit(`notifications/${NotificationAction.SHOW_ALERT_SUCCESS}`, 'Order placed successfully!', {root: true});
                    context.dispatch("cart/CLEAR_CART", false, {root: true});
                    context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                    resolve(response.data);
                }
            }).catch(err => {
                context.commit(`notifications/${NotificationAction.SET_IS_LOADING}`, false, {root: true});
                context.commit(`notifications/${NotificationAction.SET_ERROR}`, err.message);
            });
        });
    },
};

const getters = {
    getOrders: state => state.orders,
    getPageMeta: state => state.page_meta,
    getOrdersData: state => {
        return {page_meta: state.page_meta, orders: state.orders}
    }
};

export const orders = {
    namespaced: true,
    state: initialState,
    mutations,
    actions,
    getters
};
