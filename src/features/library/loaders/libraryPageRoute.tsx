import LibraryPage from "../LibraryPage.tsx";
import libraryService from "../services/libraryService.ts";
import {type LoaderFunctionArgs, redirect} from "react-router-dom";

const action = async ({request}: LoaderFunctionArgs) => {
    const formData = await request.formData();

    return redirect("/library");
};

const loader = async ({request: {signal}}: LoaderFunctionArgs) => {
    const booksPromise = libraryService.getBooksFromLibrary(signal);

    return {booksPromise};
};

export default {action, loader, element: <LibraryPage/>};