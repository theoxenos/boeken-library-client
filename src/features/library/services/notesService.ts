import apiService from "../../api/apiService.ts";
import {viteApiUrl} from "../../../utils/config.ts";
import type {IBookNoteResponse} from "../types";

const booksEndpoint = 'books';
const notesEndpoint = 'notes';

const getNotesForBook = async (bookId: number) => {
    const data = await apiService.get(`${viteApiUrl}/${booksEndpoint}/${bookId}/${notesEndpoint}`);
    return data.map((note: IBookNoteResponse) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
    }));
};

export default {
    getNotesForBook
};