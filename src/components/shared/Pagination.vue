<template>
    <div v-if="pageMeta && pageMeta" class="row">
        <b> {{firstRecord}}-{{lastRecord}}/{{totalItemsCount}}</b> <br/>
        <nav aria-label="Page navigation example">
            <ul class="pagination">

                <li v-if="pageMeta.current_page_number >= 3" class="page-item"
                    data-toggle="tooltip" data-placement="top" title="Go to first page">
                    <a class="page-link"
                       @click="fetchMore(1, pageMeta.requested_page_size)">
                        1
                    </a>
                </li>

                <li v-if="pageMeta.has_prev_page" class="page-item" data-toggle="tooltip" data-placement="top"
                    title="Previous page">
                                <span class="page-link"
                                      @click="fetchMore(pageMeta.prev_page_number, pageMeta.requested_page_size)">
      {{pageMeta.prev_page_number}}
      </span>
                </li>

                <li class="page-item active">
                    <a class="page-link page-ite">
                        {{pageMeta.current_page_number}}
                    </a>
                </li>

                <li v-if="pageMeta.has_next_page" class="page-item">
                    <a class="page-link"
                       @click="fetchMore(pageMeta.next_page_number,pageMeta.requested_page_size)">

                        {{pageMeta.next_page_number}}
                    </a>
                </li>


                <li v-if="pageMeta.current_page_number < pageMeta.total_pages_count - 1" class="page-item"
                    data-toggle="tooltip" data-placement="top" title="Go to last page">
                    <a class="page-link"
                       @click="fetchMore(pageMeta.total_pages_count,pageMeta.requested_page_size)">

                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only"> {{pageMeta.total_pages_count}}</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        name: "Pagination",
        props: ['pageMeta'],
        mounted() {

        },
        methods: {
            fetchMore(page, page_size) {
                this.$emit('fetch-more', {page, page_size});
            }
        },
        computed: {
            firstRecord() {
                return this.pageMeta.offset + 1;
            },
            lastRecord() {
                return this.pageMeta.current_items_count + this.pageMeta.offset;
            },
            totalItemsCount() {
                return this.pageMeta.total_items_count;
            }
        }

    }
</script>

<style scoped>

</style>
