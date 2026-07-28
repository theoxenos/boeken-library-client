import type {TUserLoginResponse} from "../auth/types";

class ApiClient {
    async request(url: string, options: RequestInit = {}) {
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

        if (response.status === 401) {
            // Handle token expiration
            localStorage.removeItem('token');
            // Redirect to login or refresh token
        }

        return response.json();
    }

    get(url: string, options?: RequestInit) {
        return this.request(url, { ...options, method: 'GET' });
    }

    post<T>(url: string, data: T, options?: RequestInit) {
        return this.request(url, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

export const apiClient = new ApiClient();
