<template>
    <div class="container">

        <!-- <app-carousel :items="carouselItems"></app-carousel> -->
        <app-carousel :items="this.tagsAndCategories"></app-carousel>
        <div class="container" style="margin-top: '100px'">
            <div class="row">
                <div class="col-lg-12">
                    <div class="row">
                        <template v-if="this.tagsAndCategories.length > 0">
                            <div v-for="(item, index) in this.tagsAndCategories" class="col-lg-4 col-md-6 mb-4"
                                 :key="index"
                                 :id="item.id">
                                <div class="card h-100">
                                    <a :href="`/tags/${item.slug}`">
                                        <img class="card-img-top" style="height: '250px'"
                                             :src="[item.image ? item.image : 'https://vuejs.org/images/logo.png']"
                                             alt=""/>
                                    </a>
                                    <div class="card-body">
                                        <h4 class="card-title">
                                            <router-link v-bind:to="'/tags/' + item.slug">
                                                {{item.name}}
                                            </router-link>
                                        </h4>
                                        <p class="card-text">{{item.description}}</p>
                                    </div>
                                    <div class="card-footer">
                                        <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                                        <router-link class="btn btn-primary" style="float: 'right'"
                                                     :to="'/tags/' + item.slug">
                                            Show More
                                        </router-link>
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

        </div>
    </div>
</template>

<script>

    import {mapActions, mapGetters} from 'vuex';
    import {PagesAction} from "@/store/types.actions";
    import AppCarousel from "@/components/shared/AppCarousel";

    export default {
        name: "Home",
        data() {
            return {
                "tags": [],
                "categories": [],
                'carouselItems': [],
                'tagsAndCategories': []
            };
        },
        components: {
            AppCarousel,
        },
        computed: {
            ...mapGetters("pages", [
                'getAllTags', 'getAllCategories'
            ]),
        },

        props: ['products'],

        mounted() {
            this.fetchHome().then(result => {
                const items = this.getAllTags.concat(this.getAllCategories);
                const tagsCount = this.getAllTags.length;
                items.forEach((item, index) => {
                    this.tagsAndCategories.push({
                        id: item.id,
                        name: item.name,
                        slug: item.slug,
                        description: item.description,
                        image: item.image_urls[0]
                    });

                    if (true || index === 0 || index === tagsCount) {
                        // first tag and first category
                        this.carouselItems.push({
                            id: item.id,
                            name: item.name,
                            slug: item.slug,
                            description: item.description,
                            image: item.image_urls[0]
                        });
                    }
                });
            }).catch(err => {
                throw err;
            });
        },
        methods: {
            ...mapActions('pages',
                {fetchHome: PagesAction.remote.FETCH_HOME}
            ),
        },
    }

</script>

<style scoped>

</style>
