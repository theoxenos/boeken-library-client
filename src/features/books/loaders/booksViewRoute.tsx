import booksService from "../services/booksService.ts";
import BooksView from "../BooksView.tsx";
import RequireAuth from "../../components/RequireAuth.tsx";
import type {LoaderFunctionArgs} from "react-router-dom";

const booksLoader = async ({request: {signal, url}}: LoaderFunctionArgs) => {
    const searchParams = new URL(url).searchParams;
    const {searchText, searchType} = Object.fromEntries(searchParams);

    const books = booksService.getAllBooks(signal, searchText ? {[searchType]: searchText} : undefined);

    return {books};
};

export const booksViewRoute = {
    loader: booksLoader,
    element: (
        <RequireAuth>
            <BooksView/>
        </RequireAuth>
    ),
};