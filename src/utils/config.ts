const {VITE_API_URL} = import.meta.env;

if (!VITE_API_URL) {
    throw new Error('[VITE_API_URL] env variable is missing');
}

export const viteApiUrl: string = VITE_API_URL;
