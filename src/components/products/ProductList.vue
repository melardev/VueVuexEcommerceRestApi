<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <template v-if="this.getAllProducts.length > 0">
                        <div v-for="(product, index) in this.getAllProducts" class="col-lg-4 col-md-6 mb-4"
                             :key="index"
                             :id="product.id">
                            <div class="card h-100">
                                <router-link :to="`/products/${product.slug}`">
                                    <img class="card-img-top" style="height: '250px'"
                                         :src="[product.image_urls && product.image_urls instanceof Array && product.image_urls.length > 0 && false  ? product.image_urls[0] : 'https://img.business.com/rc/816x500/aHR0cHM6Ly93d3cuYnVzaW5lc3NuZXdzZGFpbHkuY29tL2ltYWdlcy9pLzAwMC8wMTcvMDg0L29yaWdpbmFsL21hY2Jvb2stcHJvLTE4LnBuZw==?_ga=2.200130154.557404650.1551883694-765115885.1551883694']"
                                         alt=""/>
                                </router-link>
                                <div class="card-body">
                                    <h4 class="card-title">
                                        <router-link v-bind:to="'/products/' + product.slug">
                                            {{product.name}}
                                        </router-link>
                                    </h4>

                                </div>
                                <div class="card-footer">
                                    <small class="text-muted">
                                        {{ '&#9733;'.repeat( (product.rating||3) )}}
                                        {{ '&#9734;'.repeat((product.rating|| 2) )}}
                                    </small>
                                    <b>{{product.price}} $</b> &nbsp;
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        No tags, neither categories available
                    </template>
                </div>
            </div>
        </div>

        <app-pagination :page-meta="this.getPageMeta" @fetch-more="fetchMore"></app-pagination>
    </div>

</template>

<script>
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';
    import {ProductAction} from "@/store/types.actions";

    import Pagination from "@/components/shared/Pagination";

    export default {
        name: 'ProductList',
        components: {

            appPagination: Pagination
        },
        computed: {
            ...mapGetters("products", [
                'getAllProducts', 'getPageMeta'
            ]),
        },
        props: ['products'],

        mounted() {
            this.fetchProducts();
        },
        methods: {
            ...mapActions('cart', [
                'addProduct',
                'currentProduct',
            ]),
            ...mapActions('products', {fetchProducts: ProductAction.remote.FETCH_ALL}),

            fetchMore(query) {
                this.fetchProducts(query)
            },
            addProductToCart(product) {
                this.addProduct({product, quantity: 1});
            },


        },
    };
</script>

<style scoped>
    .scalable {
        transition: all .2s ease-in-out;
    }

    .scalable:hover {
        transform: scale(1.1);
    }

    .listOfProducts {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 0;
    }

    .product {
        width: 300px;
        background-color: #fff;
        list-style: none;
        box-sizing: border-box;
        padding: 1em;
        margin: 1em 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 7px;
    }

    .product-name {
        font-size: 1.2em;
        font-weight: normal;
    }

    .product-price {
        width: 100%;
        align-self: flex-start;
        display: flex;
        justify-content: space-between;
        margin-bottom: .5em;
    }

    .listOfProducts {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 0;
    }

    .product {
        width: 300px;
        background-color: #fff;
        list-style: none;
        box-sizing: border-box;
        padding: 1em;
        margin: 1em 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 7px;
    }

    .product-name {
        font-size: 1.2em;
        font-weight: normal;
    }

    .product-name:hover {
        cursor: pointer;
        text-decoration: underline;
    }

    .product-price {
        width: 100%;
        align-self: flex-start;
        display: flex;
        justify-content: space-between;
        margin-bottom: .5em;
    }

    .product-image {
        grid-column: 1/2;
        width: 50%;
    }
</style>

