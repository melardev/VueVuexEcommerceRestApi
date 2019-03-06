<template>
    <div class="container">
        <div class="card-group">
            <div class="card btn shadow-lg bg-white" @click="() => this.$router.push('/addresses')">
                <img class="card-img-top mx-auto" src="../../assets/images/world.svg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">Addresses</h5>
                    <p class="card-text">Make sure your addresses are up to date</p>
                    <p class="card-text">
                        <small class="text-muted">
                            <router-link to="/addresses">My Addresses</router-link>
                        </small>
                    </p>
                </div>
            </div>
            &nbsp;
            <div class="card btn shadow-lg bg-white">
                <img class="card-img-top mx-auto" src="../../assets/images/package.svg" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">My Orders</h5>
                    <p class="card-text">Check all your orders</p>
                    <p class="card-text">
                        <small class="text-muted">
                            <router-link to="/orders">My Orders</router-link>
                        </small>
                    </p>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Profile"
    }
</script>

<style scoped>
 img{
     width: 50%;
 }
</style>
