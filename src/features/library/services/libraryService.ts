import apiService from "../../api/apiService.ts";
import {viteApiUrl} from "../../../utils/config.ts";
import type {IBookResponse} from "../../books/types";

const libraryEndpoint = 'library';

const addToLibrary = async (bookId: number): Promise<void> => {
    await apiService.post(`${viteApiUrl}/${libraryEndpoint}`, {bookId});
};

const removeFromLibrary = async (bookId: number): Promise<void> => {
    await apiService.delete(`${viteApiUrl}/${libraryEndpoint}/${bookId}`);
};

const getBooksFromLibrary = async (signal: AbortSignal): Promise<void> => {
    const bookResponse = await apiService.get(`${viteApiUrl}/${libraryEndpoint}`, {signal});

    return bookResponse.map((book: IBookResponse) => ({
        ...book,
        createdAt: new Date(book.createdAt),
        updatedAt: new Date(book.updatedAt),
    }));
};

const updateLibraryBook = async (bookId: number, rating?: number, status?: string): Promise<void> => {
    return apiService.put(`${viteApiUrl}/${libraryEndpoint}/${bookId}`, {rating, status});
};

export default {addToLibrary, removeFromLibrary, getBooksFromLibrary, updateLibraryBook};