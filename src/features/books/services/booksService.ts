import {viteApiUrl} from "../../../utils/config.ts";
import type {IBook, TBookRequest, IBookResponse} from "../types";
import apiService from "../../api/apiService.ts";

const booksEndpoint = 'books';

const getAllBooks = async (signal: AbortSignal) => {
    const booksResponse: IBookResponse[] = await apiService.get(`${viteApiUrl}/${booksEndpoint}`, {signal});
    return booksResponse.map((book: IBookResponse): IBook => {
        const {createdAt, updatedAt} = book;
        return {
            ...book,
            createdAt: new Date(createdAt),
            updatedAt: new Date(updatedAt),
        };
    });
};

const getBookByIsbn = async (isbn: string, signal?: AbortSignal) => {
    return apiService.get(`${viteApiUrl}/${booksEndpoint}/isbn/${isbn}`, {signal});
};

const createBook = async (book: TBookRequest, signal?: AbortSignal) => {
    return apiService.post(`${viteApiUrl}/${booksEndpoint}`, book, {signal});
};

export default {getAllBooks, getBookByIsbn, createBook};