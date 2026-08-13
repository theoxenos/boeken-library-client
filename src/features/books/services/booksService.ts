import {viteApiUrl} from "../../../utils/config.ts";
import type {IBook, IBookResponse, TBookRequest} from "../types";
import apiService from "../../api/apiService.ts";

const booksEndpoint = 'books';

const getAllBooks = async (signal: AbortSignal, params?: Record<string, string>) => {
    const booksResponse: IBookResponse[] = await apiService.get(`${viteApiUrl}/${booksEndpoint}?${new URLSearchParams(params)}`, {signal});
    return booksResponse.map((book: IBookResponse): IBook => {
        const {createdAt, updatedAt} = book;
        return {
            ...book,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
        };
    });
};

const getBookById = (id: number, signal?: AbortSignal) => {
    return apiService.get(`${viteApiUrl}/${booksEndpoint}/${id}`, {signal});
};

const getBookByIsbn = async (isbn: string, signal?: AbortSignal) => {
    return apiService.get(`${viteApiUrl}/${booksEndpoint}/isbn/${isbn}`, {signal});
};

const createBook = async (book: TBookRequest, signal?: AbortSignal) => {
    return apiService.post(`${viteApiUrl}/${booksEndpoint}`, book, {signal});
};

const updateBook = async (id: number, book: TBookRequest, signal?: AbortSignal) => {
    return apiService.put(`${viteApiUrl}/${booksEndpoint}/${id}`, book, {signal});
};

export default {getAllBooks, getBookById, getBookByIsbn, createBook, updateBook};