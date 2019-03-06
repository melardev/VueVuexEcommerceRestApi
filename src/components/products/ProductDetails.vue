<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <img class="card-img-top" v-if="product.image_urls && product.image_urls.length > 0"
                     :src="product.image_urls instanceof Array && product.image_urls.length > 0 ? product.image_urls[0] : 'https://img.business.com/rc/816x500/aHR0cHM6Ly93d3cuYnVzaW5lc3NuZXdzZGFpbHkuY29tL2ltYWdlcy9pLzAwMC8wMTcvMDg0L29yaWdpbmFsL21hY2Jvb2stcHJvLTE4LnBuZw==?_ga=2.200130154.557404650.1551883694-765115885.1551883694'"
                     alt="">
            </div>

            <div class="col-md-6" v-if="product && product.slug">
                <hr/>
                <h3>{{product.name}}</h3>
                <hr/>
                <p>{{product.description}}</p>
                <hr/>
                <strong>Quantity</strong>
                <input class="form-control col-md-2" type="number" name="quantity"
                       value={this.state.quantity}
                       v-model="quantity"/>

                <h4>Price: $<strong>{{product.price.toFixed(2)}}</strong></h4>

                <button v-if="isProductInCart" class="btn btn-danger" @click="removeFromCart">
                    Remove from cart
                </button>
                &nbsp;
                <button class="btn btn-warning" @click="addProductToCart">
                    {{isProductInCart ? 'Update quantity' : 'Add to cart'}}
                </button>
                &nbsp;
                <router-link class="btn btn-success" to='/checkout'>
                    <i class="fa fa-shopping-cart"></i> Checkout
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    import {ProductAction, CartAction} from "@/store/types.actions";

    export default {

        data() {
            return {
                product: {},
                quantity: 1
            }
        },
        mounted() {
            this.quantity = this.$store.getters['cart/getCartItemQuantity'](this.$route.params.slug) || 1;
            this.fetchProduct(this.$route.params.slug).then(res => {
                if (res.success) {
                    this.product = res.product;
                }
            }).catch(err => {
                debugger;
            });
        },
        computed: {
            ...mapGetters('products', ['getProductBySlug']),
            isProductInCart: function () {
                const index = this.$store.state.cart.cartItems.findIndex(ci => {
                    if (ci.slug === this.$route.params.slug)
                        return true;
                });

                return index !== -1;
            },
            cartItemQuantity: function () {
                return this.$store.getters['cart/getCartItemQuantity'](this.$route.params.slug);
            }
        },
        watch: {
            cartItemQuantity() {
                this.quantity = this.$store.getters['cart/getCartItemQuantity'](this.$route.params.slug) || 1;
            }
        },
        methods: {
            ...mapActions('cart',
                {
                    addProduct: CartAction.ADD_PRODUCT_TO_CART,
                    removeProductFromCart: CartAction.REMOVE_FROM_CART
                }),
            ...mapActions('products', {
                fetchProduct: ProductAction.remote.FETCH_BY_SLUG
            }),
            addProductToCart() {
                this.addProduct({product: this.product, quantity: parseInt(this.quantity)});
            },
            removeFromCart() {
                this.$store.dispatch(`cart/${CartAction.REMOVE_FROM_CART}`, this.product)
            },
            rated(rate) {
                return `${rate * 20}%`;
            },

        },

    };
</script>

<style scoped>
    .product-box {
        width: 800px;
        height: 400px;
        margin: 50px auto;
        box-sizing: border-box;
        padding: 1.5em;
        background-color: #fff;
        border-radius: 7px;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .product-image {
        width: 300px;
    }

    .product-info {
        width: 400px;
        align-self: flex-start;
    }

    .product-title {
        font-weight: normal;
    }

    .product-price {
        font-size: 2em;
        font-weight: bolder;
    }

    .product-box button {
        width: 300px;
        margin: .3em 0;
    }
</style>
