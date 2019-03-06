<template>
    <div class="card text-center shadow-lg p-3 mb-5 bg-white rounded page-hero d-flex align-items-center justify-content-center">
        <div class="card-body">
            <div class="form-group col-md-12" v-if="isLoggedIn">
                <label>
                    <select v-on:change="onAddressChanged">
                        <option key="-1" value="-1">Not selected</option>

                        <option :key={index} :value="address.id" v-for="(address,index) in this.getAddresses">
                            {{address.street_address}}/{{address.country}}/{{address.city}}/{{address.zip_code}}
                        </option>
                    </select>
                </label>
            </div>

            <div class="form-group">

                <label>First Name
                    <input type="text" name="first_name" class="form-control"
                           v-model="mutable_address.first_name"/>
                </label>
            </div>

            <div class="form-group">

                <label>Last Name:
                    <input type="text" name=" last_name" class="form-control"
                           v-model="mutable_address.last_name"/>
                </label>
            </div>

            <div class=" form-group">
                <div><strong>Street Address</strong></div>

                <label>
                    <input type=" text" name=" address" class=" form-control"
                           v-model="mutable_address.street_address"/>
                </label>

            </div>
            <div class=" form-group">
                <div><strong>City:</strong></div>
                <div>
                    <label>
                        <input type=" text" name=" city" class="form-control"
                               v-model="mutable_address.city"/>
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label> Country:
                    <input type=" text" name=" state" class=" form-control"
                           v-model="mutable_address.country"/>
                </label>

            </div>
            <div class=" form-group">

                <label>Zip / Postal Code
                    <input type="text" name=" zip_code" class=" form-control"
                           v-model="mutable_address.zip_code"/>
                </label>
            </div>
        </div>
        <div class="row card-footer">
            <button type="button" class="btn btn-primary"
                    v-on:click="placeOrder">Place Order
            </button>
        </div>
    </div>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {AddressAction, OrderAction} from "@/store/types.actions";

    const defaultAddress = {
        id: -1,
        first_name: '',
        last_name: '',
        street_address: '',
        city: '',
        country: '',
        zip_code: ''
    };

    export default {
        name: "Checkout",
        data() {
            return {
                selected_address: {...defaultAddress},
                mutable_address: {...defaultAddress}
            }
        },
        mounted() {
            if (this.isLoggedIn) {
                this.fetchAddresses().then(addresses => {
                }).catch(err => {
                    throw err;
                });
            }
        },
        methods: {
            placeOrder: function () {
                let promise;
                if (this.isLoggedIn && JSON.stringify(this.selected_address) === JSON.stringify(this.mutable_address)) {
                    promise = this.checkoutReusingAddress({
                        cart_items: this.getProductsInCart,
                        address_id: this.selected_address.id
                    })
                } else {
                    promise = this.checkoutWithNewAddress({
                        cart_items: this.getProductsInCart,
                        address: this.mutable_address
                    });
                }

                promise.then(res => {
                    if (res.success)
                        this.$router.push('/');
                }).catch(err => {

                    debugger;
                })
            },
            onAddressChanged: function (evt) {
                const addressId = parseInt(evt.target.value); // Get Id of selected address Id
                const address = this.getAddresses.find(address => address.id === addressId);
                this.selected_address = address;
                this.mutable_address = {...address};
            },
            ...mapActions('orders', {
                checkoutReusingAddress: OrderAction.remote.MAKE_ORDER_REUSING_ADDRESS,
                checkoutWithNewAddress: OrderAction.remote.MAKE_ORDER_WITH_NEW_ADDRESS
            }),
            ...mapActions('addresses', {
                fetchAddresses: AddressAction.remote.FETCH_ALL
            }),
        },
        computed: {
            ...mapGetters('auth', ['isLoggedIn']),
            ...mapGetters("cart", ['getProductsInCart',]),
            ...mapGetters('addresses', ['getAddresses'])
        }
    }
</script>

<style scoped>

</style>
