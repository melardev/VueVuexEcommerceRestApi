import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/pages/Home';
import AllProducts from '../components/products/ProductList';
import ProductDetails from '../components/products/ProductDetails';
import MyCart from '../components/cart/MyCart';
import Login from '../components/users/Login';
import Checkout from '../components/orders/Checkout';
import Register from '../components/users/Register';
import Profile from '../components/users/Profile';
import OrderList from '../components/orders/OrderList';
import AddressList from '../components/addresses/AddressList';

Vue.use(Router);

export default new Router({
    mode: 'history',
    history: true,
    hash: false,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/products',
            name: 'product-list',
            component: AllProducts,
        },
        {
            path: '/cart',
            name: 'mycart',
            component: MyCart,
        },
        {
            path: '/products/:slug',
            name: 'product-details',
            component: ProductDetails,
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
        },
        {
            path: '/profile',
            name: 'profile',
            component: Profile,
        },
        {
            path: '/orders',
            name: 'order-list',
            component: OrderList,
        },
        {
            path: '/addresses',
            name: 'address-list',
            component: AddressList,
        },
        {path: '/login', component: Login, name: 'login', onlyGuest: true},
        {path: '/register', component: Register, name: 'register', onlyGuest: true},
        {path: '*', redirect: '/'}
    ],
});
