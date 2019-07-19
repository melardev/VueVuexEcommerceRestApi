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
import ProductCreate from "@/components/products/ProductCreate";
import {UsersService} from "@/services/local/users.service";

Vue.use(Router);

let router = new Router({
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
            name: 'my_cart',
            component: MyCart,
        },
        {
            path: '/products/new',
            name: 'product-create',
            component: ProductCreate,
            meta: {
                isAuthenticated: true,
                isAdmin: true
            }
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
            meta: {
                isAuthenticated: true,
            }
        },
        {
            path: '/orders',
            name: 'order-list',
            component: OrderList,
            meta: {
                isAuthenticated: true,
            }
        },
        {
            path: '/addresses',
            name: 'address-list',
            component: AddressList,
            meta: {
                isAuthenticated: true,
            }
        },
        {
            path: '/login', component: Login, name: 'login',
            meta: {
                isAuthenticated: false
            }
        },
        {
            path: '/register', component: Register, name: 'register',
            meta: {
                isAuthenticated: false
            }
        },
        {path: '*', redirect: '/'}
    ],
});

router.beforeEach((to, from, next) => {
    const user = UsersService.getUser();
    if (to.matched.some((routeRecord) => routeRecord.meta.isAuthenticated)) {
        // User should be authenticated
        if (user == null) {
            return next({
                path: '/login',
                params: {nextUrl: to.fullPath}
            });
        } else {
            if (to.matched.some((routeRecord2) => routeRecord2.meta.isAdmin)) {
                // Must be admin
                if (user.roles && user.roles.findIndex(r => r === 'ROLE_ADMIN') !== -1) {
                    return next();
                } else {
                    debugger;
                    return next({
                        name: '/'
                    });
                }
            } else {
                return next();
            }
        }
    } else if (to.matched.some((routeRecord) => routeRecord.meta.isAuthenticated === false)) {
        // User should NOT be authenticated
        if (user) {
            // If he is redirect it to profile from there he should logout
            return next({
                name: 'profile'
            });
        } else {
            return next();
        }
    }
})
;

export default router;
