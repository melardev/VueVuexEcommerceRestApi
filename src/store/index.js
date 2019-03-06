import Vue from 'vue';
import Vuex from 'vuex';
import {cart} from './modules/cart.module';
import {products} from './modules/products.module';
import {auth} from './modules/auth.module';
import {notifications} from './modules/notifications.module';
import {pages} from './modules/pages.module';
import {addresses} from './modules/addresses.module';
import {orders} from './modules/orders.module';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {},
    modules: {
        auth, cart, notifications, products, pages, addresses, orders
    }
});
