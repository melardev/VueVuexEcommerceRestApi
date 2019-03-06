<template>

    <carousel :autoplay="true">
        <slide v-for="(item,index) in items" :key="index">
            <!--<img class="d-block w-100" :src="item.image" alt="Cool image"/>-->
            <img class="d-block w-100" :src="`../../assets/images/asus.jpg`" alt="Cool image"/>
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
