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

};
