import {CartService} from "@/services/local/cart.service";
import {CartAction} from "@/store/types.actions";

const state = {
    cartItems: [],

};

const mutations = {
    'SET_CART_ITEMS'(state, cartItems) {
        state.cartItems = cartItems;
    },

    CLEAR_CART: (state) => {
        state.cartItems = [];
    }
};

const actions = {
    // actions can only receive one single developer controller parameter
    // so if we need two (product and quantity) we have to put them in a JS object and take them away with destruct operator {}
    [CartAction.ADD_PRODUCT_TO_CART]: (context, {product, quantity}) => {
        const cartItems = CartService.addItem(product, quantity);
        context.commit(CartAction.SET_CART_ITEMS, cartItems);
    },
    [CartAction.REMOVE_FROM_CART]: ({commit}, product) => {
        const cartItems = CartService.removeItem(product);
        commit(CartAction.SET_CART_ITEMS, cartItems);
    },

    [CartAction.UPDATE_CART_ITEM_QUANTITY](context, args) {
        context.dispatch(CartAction.ADD_PRODUCT_TO_CART, {product: args.cartItem, quantity: args.quantity})
    },
    'CLEAR_CART'(context) {
        CartService.emptyCart();
        context.commit(CartAction.CLEAR_CART);
    }
};

const getters = {
    getProductsInCart: state => state.cartItems,
    getTotalPrice: (state) => {
        let res = 0;
        state.cartItems.map(item => {
            res += item.price * item.quantity;
        });
        return res;
    },
    getCartItemQuantity: state => slug => {
        const cartItem = state.cartItems.find(ci => ci.slug === slug);
        if (cartItem) return cartItem.quantity;
        else return 0;
    }
};

export const cart = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};
