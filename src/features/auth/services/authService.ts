import type {TUserLogin, TUserRegistration} from "../types";
import {apiClient} from "../../api/ApiClient.ts";
import {viteApiUrl} from "../../../utils/config.ts";

const baseURL = `${viteApiUrl}/auth`;

const login = async (loginData: TUserLogin) => {
    return apiClient.post(`${baseURL}/login`, loginData);
};

const register = async (registerData: TUserRegistration) => {
    return apiClient.post(`${baseURL}/register`, registerData);
};

export default {login, register};