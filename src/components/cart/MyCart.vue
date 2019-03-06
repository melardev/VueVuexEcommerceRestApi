<template>
    <div class="container">
        <table id="cart" class="table table-hover table-condensed">
            <thead>
            <tr>
                <th style='{width: "50%"}'>Product</th>
                <th style='{width: "10%"}'>Price</th>
                <th style='{width: "8%"}'>Quantity</th>
                <th style='{width: "22%"}' class="text-center">Subtotal</th>
                <th style='{width: "10%"}'></th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(cartItem, index) in getProductsInCart" :key="index">
                <td data-th="Product">
                    <div class="row">
                        <div class="col-sm-3 hidden-xs">
                            <img :src="cartItem.image_urls && cartItem.image_urls.length > 0 ? cartItem.image_urls[0] : 'https://img.business.com/rc/816x500/aHR0cHM6Ly93d3cuYnVzaW5lc3NuZXdzZGFpbHkuY29tL2ltYWdlcy9pLzAwMC8wMTcvMDg0L29yaWdpbmFsL21hY2Jvb2stcHJvLTE4LnBuZw==?_ga=2.200130154.557404650.1551883694-765115885.1551883694'"
                                 :alt="cartItem.name + ' Image'"
                                 class="checkout-image"/></div>
                        <div class="col-sm-9">
                            <h4>{{cartItem.name}}</h4>
                            <p>{{cartItem.description}}</p>
                        </div>
                    </div>
                </td>
                <td data-th="Price">${{cartItem.price}}</td>
                <td data-th="Quantity">
                    <label>
                        <input class="form-control text-center" type="number" min="1"
                               :value="cartItem.quantity" @change="updateCartItem($event, cartItem)"/>
                    </label>
                </td>
                <td data-th="Subtotal" class="text-center">{{calculateSubtotal(cartItem)}}$</td>
                <td class="actions" data-th="">
                    <button class="remove-product"
                            @click="removeFromCart(cartItem)">
                        X
                    </button>
                </td>
            </tr>
            </tbody>
            <tfoot>
            <tr class="visible-xs">
                <td class="text-center"><strong>Total {{totalPrice()}}</strong></td>
            </tr>
            <tr>
                <td>
                    <router-link to="/products" class="btn btn-warning">
                        <i class="fa fa-angle-left"></i> Continue Shopping
                    </router-link>
                </td>
                <td colspan="2" class="hidden-xs"></td>
                <td class="hidden-xs text-center"><strong>Total {{totalPrice()}}</strong>
                </td>
                <td>
                    <router-link to="/checkout" class="btn btn-success btn-block">
                        Checkout
                        <i class="fa fa-angle-right"></i>
                    </router-link>
                </td>
            </tr>
            </tfoot>
        </table>
    </div>

</template>

<script>
    import {mapGetters, mapActions} from 'vuex';
    import {CartAction} from "@/store/types.actions";

    export default {
        name: 'Checkout',
        computed: {
            ...mapGetters('cart', [
                'getProductsInCart',
            ]),
        },

        methods: {
            ...mapActions('cart',
                {
                    addProduct: CartAction.ADD_PRODUCT_TO_CART,
                    updateQuantity: CartAction.UPDATE_CART_ITEM_QUANTITY,
                    removeProductFromCart: CartAction.REMOVE_FROM_CART
                }),
            hasProduct() {
                return this.getProductsInCart.length > 0;
            },
            totalPrice() {
                const price = this.getProductsInCart.reduce((accumulator, cartItem) =>
                    accumulator + cartItem.quantity * cartItem.price, 0);
                if (price)
                    return price.toFixed(2);
                else {
                    // this may occur when you delete all cart items
                    debugger;
                    return 0
                }

            },
            removeFromCart(cartItem) {
                this.removeProductFromCart(cartItem);
            },

            calculateSubtotal(cartItem) {
                const price = (cartItem.price * cartItem.quantity);
                if (price)
                    return price.toFixed(2);
                else {
                    // this may occur when you delete all cart items
                    debugger;
                    return 0
                }
            },

            updateCartItem(event, cartItem) {
                const quantity = parseInt(event.target.value);
                this.updateQuantity({cartItem, quantity});
            }
        },
    };
</script>

<style scoped>
    .checkout-box {
        width: 100%;
        max-width: 900px;
        display: flex;
        flex-direction: column;
        margin: 50px auto;
        box-sizing: border-box;
        padding: 1em;
    }

    .checkout-list {
        padding: 0;
    }

    .checkout-product {
        display: grid;
        grid-template-columns: 1fr 3fr 2fr .5fr;
        background-color: #fff;
        box-shadow: 0px 0px 10px rgba(73, 74, 78, 0.1);
        border-radius: 5px;
        list-style: none;
        box-sizing: border-box;
        padding: .8em;
        margin: 1em 0;
    }

    .checkout-product * {
        place-self: center;
    }

    .remove-product {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        border: 0;
        background-color: #E0E0E0;
        color: #fff;
        cursor: pointer;
    }

    .remove-product:hover {
        background-color: #e02820;
    }

    .checkout-image {
        height: 100px;
        width: 100px
    }

</style>
