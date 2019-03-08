<template>
    <div class="container">
        <div class="row">
            <template v-if="this.getOrders.length > 0">
                <div :key=index v-for="(order,index) in this.getOrders">
                    <div :class="`${classNames[index%2]}`" style="max-width: '18rem;'">
                        <div class="card-header">{{order.tracking_number}}</div>
                        <div class="card-body">
                            <h5 class="card-title">{{order.order_status}}</h5>
                            <p class="card-text">{{order.total_price.toFixed(2)}}$ for {{order.order_items_count}}</p>
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
    import {OrderAction} from "@/store/types.actions";
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "OrderList",
        data() {
            return {
                classNames: ['card bg-light mb-3', 'card text-white bg-dark mb-3']
            }
        },
        mounted() {
            this.fetchOrders()
        },
        methods: {
            ...mapActions('orders', {fetchOrders: OrderAction.remote.FETCH_ALL}),
        },
        computed: {
            ...mapGetters('orders', ['getOrders'])
        }
    }
</script>

<style scoped>

</style>
