import {AxiosService} from "./base/axios.service";

export const ProductsAxiosService = {
    fetchAll(args) {
        return AxiosService.fetchPage('products', args);
    },
    fetchBySlug(slug) {
        if (typeof slug !== "string") {
            throw new Error(
                "Slug must be a string"
            );
        }
        return AxiosService.get(`/products/${slug}`);
    },

    create(product) {
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('description', product.description);
        formData.append('stock', product.stock);
        formData.append('price', product.price);
        const images = product.images;

        for (let i = 0; images != null && i < images.length; i++) {
            formData.append('images[]', images[i], images[i].name);
        }
        return AxiosService.post(`products`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    }
};
