import {AxiosService} from "@/services/remote/base/axios.service";
import {AuthAxiosService} from "@/services/remote/auth-axios.service";
import {JwtService} from "@/services/local/jwt.service";


const login = (loginDto) => {
    return AuthAxiosService.login(loginDto)
};

const register = (userObject) => {
    return AuthAxiosService.register(userObject);
};

const logout = () => {
    JwtService.clearSession();
};

const init = () => {
    const user = JwtService.getUser();
    if (user && user.username) {
        AxiosService.setUser(user);
    }
};
const getUser = () => {
    return JwtService.getUser();
};
export const UsersService = {
    register, login, logout, init, getUser
};
