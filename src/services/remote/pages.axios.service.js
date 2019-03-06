import {AxiosService} from "@/services/remote/base/axios.service";

export const PagesAxiosService = {
    fetchHome() {
        return AxiosService.get('/');
    },
    getAbout() {

    }
};
