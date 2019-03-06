import {AxiosService} from "@/services/remote/base/axios.service";


export const AddressesAxiosService = {

    fetchAll() {
        return AxiosService.get('/addresses');
    },

    create() {
    }

};
