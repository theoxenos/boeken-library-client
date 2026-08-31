import type {TUserLogin, TUserRegistration} from "../types";
import apiService from "../../api/apiService.ts";
import {viteApiUrl} from "../../../utils/config.ts";

const baseURL = `${viteApiUrl}/auth`;

const login = async (loginData: TUserLogin) => {
    return apiService.post(`${baseURL}/login`, loginData);
};

const register = async (registerData: TUserRegistration) => {
    return apiService.post(`${baseURL}/register`, registerData);
};

export default {login, register};