import type {TUserLoginResponse} from "../auth/types";

const request = async (url: string, options: RequestInit = {}) => {
    const user: TUserLoginResponse = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')!) : null;
    const token = user?.token;

    const headers = new Headers({
        'Content-Type': 'application/json',
        ...options.headers,
    });

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    // if (response.status === 401) {
    //     // Handle token expiration
    //     localStorage.removeItem('token');
    //     // Redirect to login or refresh token
    // }

    return response.json();
};

const get = (url: string, options?: RequestInit) => {
    return request(url, { ...options, method: 'GET' });
};

const post = <T>(url: string, data: T, options?: RequestInit) => {
    return request(url, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
    });
};

const deleteRequest = (url: string, options?: RequestInit) => {
    return request(url, { ...options, method: 'DELETE' });
};

export default {get, post, delete: deleteRequest};