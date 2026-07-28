import booksService from "../services/booksService.ts";
import BooksView from "../BooksView.tsx";
import RequireAuth from "../../components/RequireAuth.tsx";

type BooksLoaderParams = { request: { signal: AbortSignal } };
const booksLoader = async ({request: {signal}}: BooksLoaderParams) => {
    const books = booksService.getAllBooks(signal);

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