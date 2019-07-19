import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import {UsersService} from "@/services/local/users.service";
import {AuthAction} from "@/store/types.actions";
import {CartService} from "@/services/local/cart.service";
import Toasted from 'vue-toasted';
import VueCarousel from 'vue-carousel';
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use(VueCarousel);
Vue.use(Toasted);
Vue.use(CKEditor);

UsersService.init();
const user = UsersService.getUser();
if (user && user.username) {
    store.commit('auth/' + AuthAction.local.SET_USER, user);
}

const cart = CartService.getCart();
store.commit('cart/SET_CART_ITEMS', cart);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
