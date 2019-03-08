<template>

    <carousel :loop="true" :autoplay="true">
        <slide v-for="(item,index) in items" :key="index">
            <!--<img class="d-block w-100" :src="item.image" alt="Cool image"/>-->
            <img class="d-block w-100" src="https://img.business.com/rc/816x500/aHR0cHM6Ly93d3cuYnVzaW5lc3NuZXdzZGFpbHkuY29tL2ltYWdlcy9pLzAwMC8wMTcvMDg0L29yaWdpbmFsL21hY2Jvb2stcHJvLTE4LnBuZw==?_ga=2.200130154.557404650.1551883694-765115885.1551883694" alt="Cool image"/>
        </slide>
    </carousel>

</template>

<script>
    export default {
        data() {
            return {
                images: ['asus.jpg', 'macbook.jpg']
            }
        },
        name: "AppCarousel",
        props: ['items'],
        mounted() {
            // if (this.items.length > 0)
            // debugger
        }
    }
</script>

<style scoped>
    div {
        background-color: black;
    }
</style>
