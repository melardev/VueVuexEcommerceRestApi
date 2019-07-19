<template>
    <div>
        <app-header></app-header>
        <app-notifications></app-notifications>
        <div class="container">
            <div class="row text-center" v-if="isAppLoading">
                <grid-loader :loading="isAppLoading" :color="loaderColor" :size="loaderSize"></grid-loader>
            </div>
            <transition name="fade">
                <router-view></router-view>
            </transition>
            <darken-background v-if="shouldShowCartDialog" @click.native="togglePopupCart()"/>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    import popupcart from './components/cart/PopupCart';
    import darkenBackground from './components/shared/DarkenBackground';

    import Notifications from "@/components/shared/Notifications";
    import Header from "@/components/shared/Header";
    import Footer from "@/components/shared/Footer";
    import GridLoader from 'vue-spinner/src/GridLoader.vue';

    export default {
        components: {
            appNotifications: Notifications,
            appHeader: Header,
            appFooter: Footer,

            popupcart,
            darkenBackground,
            GridLoader,
        },

        data() {
            return {
                loaderColor: "#5cb85c",
                loaderSize: "50px",
                displayList: false
            }
        },

        methods: {
            ...mapActions('notifications', [
                'togglePopupCart',
            ]),
            hasProduct() {
                return this.getProductsInCart.length > 0;
            },
        },
        computed: {
            ...mapGetters('cart', [
                'getProductsInCart',
            ]),
            ...mapGetters('notifications', [
                'shouldShowCartDialog',
                'isAppLoading'
            ])
        },
    };
</script>

<style>
    @import './assets/css/normalize.css';
    @import '~font-awesome/css/font-awesome.min.css';
    @import '~bootstrap/dist/css/bootstrap.min.css';

    body {
        font-family: 'Roboto', sans-serif;
        background-color: #FAFAFA;
    }

    a {
        color: #000;
        text-decoration: none;
    }

    .cart {
        position: absolute;
        top: 75px;
        right: 300px;
    }

    .leave-enter-active, .leave-leave-active {
        transition: all 1.2s;
    }

    .leave-enter, .leave-leave-to {
        opacity: 0;
        transform: translateX(-50%);
    }

    .appear-enter-active {
        animation: appear-animation .5s;
    }

    .appear-leave-active {
        animation: appear-animation .5s reverse;
    }

    @keyframes appear-animation {
        0% {
            transform: translateY(-50%);
            opacity: 0;
        }
        100% {
            transform: translateY(0%);
            opacity: 1;
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }


    /* Sticky footer styles
    -------------------------------------------------- */
    html {
        position: relative;
        min-height: 100%;
    }

    body {
        /* Margin bottom by footer height */
        margin-bottom: 60px;
        padding-top: 100px;
    }

    .footer {
        position: absolute;
        bottom: 0;
        width: 100%;
        /* Set the fixed height of the footer here */
        height: 60px;
        line-height: 60px; /* Vertically center the text there */
        background-color: #f5f5f5;
    }

    /* Custom page CSS
    -------------------------------------------------- */
    /* Not required for template or sticky footer method. */

    body > .container {
        padding: 60px 15px 0;
    }

    .footer > .container {
        padding-right: 15px;
        padding-left: 15px;
    }

    code {
        font-size: 80%;
    }

    .btn-social {
        position: relative;
        padding-left: 44px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis
    }

    .btn-social :first-child {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 32px;
        line-height: 34px;
        font-size: 1.6em;
        text-align: center;
        border-right: 1px solid rgba(0, 0, 0, 0.2)
    }

    .btn-social.btn-lg {
        padding-left: 61px
    }

    .btn-social.btn-lg :first-child {
        line-height: 45px;
        width: 45px;
        font-size: 1.8em
    }

    .btn-social.btn-sm {
        padding-left: 38px
    }

    .btn-social.btn-sm :first-child {
        line-height: 28px;
        width: 28px;
        font-size: 1.4em
    }

    .btn-social.btn-xs {
        padding-left: 30px
    }

    .btn-social.btn-xs :first-child {
        line-height: 20px;
        width: 20px;
        font-size: 1.2em
    }

    .btn-social-icon {
        position: relative;
        padding-left: 44px;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 34px;
        width: 34px;
        padding: 0
    }

    .btn-social-icon :first-child {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 32px;
        line-height: 34px;
        font-size: 1.6em;
        text-align: center;
        border-right: 1px solid rgba(0, 0, 0, 0.2)
    }

    .btn-social-icon.btn-lg {
        padding-left: 61px
    }

    .btn-social-icon.btn-lg :first-child {
        line-height: 45px;
        width: 45px;
        font-size: 1.8em
    }

    .btn-social-icon.btn-sm {
        padding-left: 38px
    }

    .btn-social-icon.btn-sm :first-child {
        line-height: 28px;
        width: 28px;
        font-size: 1.4em
    }

    .btn-social-icon.btn-xs {
        padding-left: 30px
    }

    .btn-social-icon.btn-xs :first-child {
        line-height: 20px;
        width: 20px;
        font-size: 1.2em
    }

    .btn-social-icon :first-child {
        border: none;
        text-align: center;
        width: 100% !important
    }

    .btn-social-icon.btn-lg {
        height: 45px;
        width: 45px;
        padding-left: 0;
        padding-right: 0
    }

    .btn-social-icon.btn-sm {
        height: 30px;
        width: 30px;
        padding-left: 0;
        padding-right: 0
    }

    .btn-social-icon.btn-xs {
        height: 22px;
        width: 22px;
        padding-left: 0;
        padding-right: 0
    }

    .btn-facebook {
        color: #fff;
        background-color: #3b5998;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-facebook:hover, .btn-facebook:focus, .btn-facebook:active, .btn-facebook.active, .open .dropdown-toggle.btn-facebook {
        color: #3b5998;
        background-color: #fff;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-facebook:active, .btn-facebook.active, .open .dropdown-toggle.btn-facebook {
        background-image: none
    }

    .btn-facebook.disabled, .btn-facebook[disabled], fieldset[disabled] .btn-facebook, .btn-facebook.disabled:hover, .btn-facebook[disabled]:hover, fieldset[disabled] .btn-facebook:hover, .btn-facebook.disabled:focus, .btn-facebook[disabled]:focus, fieldset[disabled] .btn-facebook:focus, .btn-facebook.disabled:active, .btn-facebook[disabled]:active, fieldset[disabled] .btn-facebook:active, .btn-facebook.disabled.active, .btn-facebook[disabled].active, fieldset[disabled] .btn-facebook.active {
        background-color: #3b5998;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-github {
        color: #141414;
        background-color: #ffffff;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-github:hover, .btn-github:focus, .btn-github:active, .btn-github.active, .open .dropdown-toggle.btn-github {
        color: #ffffff;
        background-color: #141414;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-github:active, .btn-github.active, .open .dropdown-toggle.btn-github {
        background-image: none
    }

    .btn-github.disabled, .btn-github[disabled], fieldset[disabled] .btn-github, .btn-github.disabled:hover, .btn-github[disabled]:hover, fieldset[disabled] .btn-github:hover, .btn-github.disabled:focus, .btn-github[disabled]:focus, fieldset[disabled] .btn-github:focus, .btn-github.disabled:active, .btn-github[disabled]:active, fieldset[disabled] .btn-github:active, .btn-github.disabled.active, .btn-github[disabled].active, fieldset[disabled] .btn-github.active {
        background-color: #444;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-google-plus {
        color: #fff;
        background-color: #dd4b39;
        text-transform: lowercase;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-google-plus:hover, .btn-google-plus:focus, .btn-google-plus:active, .btn-google-plus.active, .open .dropdown-toggle.btn-google-plus {
        color: #dd4b39;
        background-color: #fff;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-google-plus:active, .btn-google-plus.active, .open .dropdown-toggle.btn-google-plus {
        background-image: none
    }

    .btn-google-plus.disabled, .btn-google-plus[disabled], fieldset[disabled] .btn-google-plus, .btn-google-plus.disabled:hover, .btn-google-plus[disabled]:hover, fieldset[disabled] .btn-google-plus:hover, .btn-google-plus.disabled:focus, .btn-google-plus[disabled]:focus, fieldset[disabled] .btn-google-plus:focus, .btn-google-plus.disabled:active, .btn-google-plus[disabled]:active, fieldset[disabled] .btn-google-plus:active, .btn-google-plus.disabled.active, .btn-google-plus[disabled].active, fieldset[disabled] .btn-google-plus.active {
        background-color: #dd4b39;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-instagram {
        color: #fff;
        background-color: #3f729b;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-instagram:hover, .btn-instagram:focus, .btn-instagram:active, .btn-instagram.active, .open .dropdown-toggle.btn-instagram {
        color: #3f729b;
        background-color: #fff;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-instagram:active, .btn-instagram.active, .open .dropdown-toggle.btn-instagram {
        background-image: none
    }

    .btn-instagram.disabled, .btn-instagram[disabled], fieldset[disabled] .btn-instagram, .btn-instagram.disabled:hover, .btn-instagram[disabled]:hover, fieldset[disabled] .btn-instagram:hover, .btn-instagram.disabled:focus, .btn-instagram[disabled]:focus, fieldset[disabled] .btn-instagram:focus, .btn-instagram.disabled:active, .btn-instagram[disabled]:active, fieldset[disabled] .btn-instagram:active, .btn-instagram.disabled.active, .btn-instagram[disabled].active, fieldset[disabled] .btn-instagram.active {
        background-color: #3f729b;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-twitter {
        color: #ffffff;
        background-color: #55acee;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-twitter:hover, .btn-twitter:focus, .btn-twitter:active, .btn-twitter.active, .open .dropdown-toggle.btn-twitter {
        color: #55acee;
        background-color: #ffffff;
        border-color: rgba(0, 0, 0, 0.2)
    }

    .btn-twitter:active, .btn-twitter.active, .open .dropdown-toggle.btn-twitter {
        background-image: none
    }

    .btn-twitter.disabled, .btn-twitter[disabled], fieldset[disabled] .btn-twitter, .btn-twitter.disabled:hover, .btn-twitter[disabled]:hover, fieldset[disabled] .btn-twitter:hover, .btn-twitter.disabled:focus, .btn-twitter[disabled]:focus, fieldset[disabled] .btn-twitter:focus, .btn-twitter.disabled:active, .btn-twitter[disabled]:active, fieldset[disabled] .btn-twitter:active, .btn-twitter.disabled.active, .btn-twitter[disabled].active, fieldset[disabled] .btn-twitter.active {
        background-color: #55acee;
        border-color: rgba(0, 0, 0, 0.2)
    }

</style>
