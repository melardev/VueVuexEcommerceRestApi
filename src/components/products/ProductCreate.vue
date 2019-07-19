<template>
    <div class="container">
        <form v-on:submit.prevent>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" id="title" required name="title"
                       v-model="product.name"/>
            </div>

            <div class="row">
                <div class="mb-3">
                    <label>Description</label>
                    <ckeditor :editor="editor" v-model="product.description" :config="editorConfig"></ckeditor>
                </div>
            </div>

            <div class="mb-3">
                <div class="col-md-2 mb-3">
                    <label for="price">Price</label>
                    <input type="number" class="form-control" id="price"
                           placeholder="0" step="any"
                           v-model="product.price"/>
                </div>
            </div>

            <div class="row">
                <div class="col-md-2">
                    <label for="stock">Stock</label>
                    <input type="number" class="form-control"
                           id="stock" placeholder="1" step="1"
                           v-model="product.stock"
                    />
                </div>
            </div>

            <div class=" mb-3">
                <div class="col-md-2">
                    <label for="stock">Images</label>
                    <input id="p_files" ref="inputFile" name="p_files"
                           type="file"
                           multiple/>
                </div>
            </div>

            <hr class="mb-4"/>
            <button class="btn btn-primary btn-lg btn-block" type="submit"
                    v-on:click="submitForm()">Create
            </button>
        </form>
        <br/>
        <button class=" col-4 btn btn-secondary col-md-2" v-on:click="showCode = !showCode">Show/Hide Code</button>
        <br/>

        <code v-if="showCode">
            {{product.description}}
        </code>

        <br/>
        <br/>
    </div>
</template>

<script>
    import {ProductAction} from "@/store/types.actions";
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import {mapActions} from 'vuex'


    export default {
        name: "ProductCreate",
        mounted() {
            console.log(ClassicEditor.builtinPlugins.map(plugin => plugin.pluginName));
        },
        data() {
            return {
                isSubmitting: false, submitted: false, showCode: false,
                editor: ClassicEditor,
                editorConfig: {
                    // The configuration of the editor.
                    removePlugins: ['ImageToolbar', 'ImageUpload', 'MediaEmbed']
                },
                product: {
                    name: '', description: '', price: 1, stock: 1
                }
            }
        },

        methods: {
            ...mapActions('products', {createProduct: ProductAction.remote.CREATE}),
            submitForm() {
                this.product.images = this.$refs.inputFile.files; // fileList
                this.createProduct(this.product).then(res => {
                    this.isSubmitting = false;
                    if (res.success) {
                        this.$router.push('/');
                    }
                }).catch(err => {
                    this.isSubmitting = false;
                });
            }
        }
    }


</script>

<style scoped>

</style>
