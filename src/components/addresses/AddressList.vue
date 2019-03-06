<template>
    <div class="container">
        <div class="row">
            <template v-if="this.getAddresses.length > 0">
                <div :key=index v-for="(address,index) in this.getAddresses">
                    <div :class="`${classNames[index%2]}`" style="max-width: '18rem;'">
                        <div class="card-header">{{address.first_name}} {{address.last_name}}</div>
                        <div class="card-body">
                            <h5 class="card-title">{{address.street_address}}</h5>
                            <p class="card-text">{{address.city}} {{address.country}}</p>
                        </div>
                    </div>
                </div>

            </template>
            <template v-else>
                You have no orders made yet
            </template>

        </div>
    </div>
</template>

<script>
    import {AddressAction} from "@/store/types.actions";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "AddressList",
        data() {
            return {
                classNames: ['card bg-light mb-3', 'card text-white bg-dark mb-3']
            }
        },
        mounted() {
            this.fetchAddresses()
        },
        methods: {
            ...mapActions('addresses', {fetchAddresses: AddressAction.remote.FETCH_ALL}),
        },
        computed: {
            ...mapGetters('addresses', ['getAddresses'])
        }
    }
</script>

<style scoped>

</style>