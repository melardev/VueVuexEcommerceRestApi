<template>
    <nav class="navbar navbar-inverse" role="navigation">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header">
                <router-link to="/" class="navbar-brand">Online Store</router-link>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <router-link to="/login" tag="li" v-if="!isLoggedIn"><a>Login</a></router-link>
                <li v-if="isLoggedIn" class="li-pointer">
                    <a @click="logout">Logout</a>
                </li>
                <li v-if="isLoggedIn" class="li-pointer">
                    <router-link to="/profile" v-if="isLoggedIn">
                        <a>Profile</a>
                    </router-link>
                </li>
                <router-link to="/register" tag="li" v-if="!isLoggedIn"><a>Register</a></router-link>
                <li>
                    <button class="btn btn-success navbar-btn btn-small" @click="togglePopupCart()">
                        <span class="badge">{{ numItems }} ($ {{ getTotalPrice }})</span>
                        <i class="fas fa-shopping-cart"></i>
                        <img src="../assets/images/cart.svg"/>
                        <span class="btn-circle" v-if="hasProduct()">
                        {{ getProductsInCart.length }}
                        </span>
                    </button>
                    <transition name="appear">
                        <popupcart class="cart" v-if="shouldShowCartDialog"/>
                    </transition>
                </li>
            </ul>

        </div>
        <!-- /.container -->
    </nav>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import popupcart from './cart/PopupCart';
    import {AuthAction} from "@/store/types.actions";

    export default {
        components: {
            popupcart
        },
        computed: {
            ...mapGetters('auth', ['isLoggedIn', 'currentUser']),
            ...mapGetters('cart', ['getTotalPrice', 'getProductsInCart']),
            ...mapGetters('notifications', [
                'shouldShowCartDialog',
            ]),
            numItems() {
                return this.getProductsInCart.reduce((total, item) => {
                    total += item.quantity;
                    return total
                }, 0);
            },
            userEmail() {
                return this.isLoggedIn ? this.currentUser.username : ''
            }
        },
        methods: {
            ...mapActions('auth', {logout: AuthAction.local.LOGOUT}),
            ...mapActions('notifications', [
                'togglePopupCart',
            ]),
            showPopupCart() {
                alert(1);
                this.togglePopupCart();
            },
            hasProduct() {
                return this.getProductsInCart.length > 0;
            },
        }
    }
</script>


<style scoped lange="sass">
    .navbar-btn a {
        color: white;
    }

    .li-pointer {
        cursor: pointer;
    }

    .li-pointer:hover {
        cursor: pointer;
    }

    .fas, img {
        max-width: 20px;
        margin-left: .5em;
    }
</style>
