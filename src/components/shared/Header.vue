<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div class="container">
            <a class="navbar-brand" href="/">Vue + Vuex Ecommerce app</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/">Home
                            <span class="sr-only">(current)</span>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link" to="/products">New Products
                            <span class="sr-only">(current)</span>
                        </router-link>
                    </li>
                    <li class="nav-item li-pointer" v-if="isLoggedIn">
                        <router-link class="nav-link" to="/products/new" tag="li">Create Product</router-link>
                    </li>
                    <li class="nav-item li-pointer" v-if="!isLoggedIn">
                        <router-link class="nav-link" to="/login" tag="li">Login</router-link>
                    </li>
                    <li class="nav-item li-pointer" v-if="!isLoggedIn">
                        <router-link class="nav-link" to="/register" tag="li">Register</router-link>
                    </li>

                    <li class="nav-item li-pointer" v-if="isLoggedIn">
                        <a @click="logout" class="nav-item nav-link li-pointer">Logout</a>
                    </li>

                    <li v-if="isLoggedIn" class="nav-item li-pointer">
                        <router-link to="/profile" v-if="isLoggedIn" class="nav-link">
                            <a>Profile</a>
                        </router-link>
                    </li>

                    <li>
                        <button class="btn btn-success navbar-btn btn-small" @click="togglePopupCart()">
                            <span class="badge">{{ numItems }} Items ({{ getTotalPrice.toFixed(2) }} $)</span>
                            <i class="fa fa-shopping-cart"></i>
                        </button>
                        <transition name="appear">
                            <popupcart class="cart" v-if="shouldShowCartDialog"/>
                        </transition>
                    </li>

                </ul>
            </div>
        </div>
    </nav>

</template>

<script>

    import {mapActions, mapGetters} from 'vuex';
    import popupcart from '../cart/PopupCart';
    import {AuthAction} from "@/store/types.actions";

    export default {
        name: "Header",
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

<style scoped>

</style>
