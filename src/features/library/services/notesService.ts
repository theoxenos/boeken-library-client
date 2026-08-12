import apiService from "../../api/apiService.ts";
import {viteApiUrl} from "../../../utils/config.ts";
import type {IBaseNote, IBookNoteResponse} from "../types";

const booksEndpoint = 'books';
const notesEndpoint = 'notes';

const getNoteById = async (noteId: number, signal?: AbortSignal) => {
    return await apiService.get(`${viteApiUrl}/${notesEndpoint}/${noteId}`, {signal});
};

const getNotesByBookId = async (bookId: number, signal?: AbortSignal) => {
    const data = await apiService.get(`${viteApiUrl}/${booksEndpoint}/${bookId}/${notesEndpoint}`, {signal});
    return data.map((note: IBookNoteResponse) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt)
    }));
};

const createNote = async (note: Omit<IBaseNote, 'id'>) => {
    return apiService.post(`${viteApiUrl}/${notesEndpoint}`, note);
};

const updateNote = async (note: IBaseNote) => {
    return apiService.put(`${viteApiUrl}/${notesEndpoint}/${note.id}`, note);
};

export default {
    getNoteById,
    getNotesByBookId,
    createNote,
    updateNote
};