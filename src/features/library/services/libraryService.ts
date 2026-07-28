import apiService from "../../api/apiService.ts";
import { viteApiUrl } from "../../../utils/config.ts";

const libraryEndpoint = 'library';

const addToLibrary = async (bookId: number): Promise<void> => {
    await apiService.post(`${viteApiUrl}/${libraryEndpoint}`, {bookId});
};

const removeFromLibrary = async (bookId: number): Promise<void> => {
    await apiService.delete(`${viteApiUrl}/${libraryEndpoint}/${bookId}`);
};

export default { addToLibrary, removeFromLibrary };