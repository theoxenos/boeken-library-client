import booksService from "../services/booksService.ts";
import BooksView from "../BooksView.tsx";
import RequireAuth from "../../components/RequireAuth.tsx";
import type {LoaderFunctionArgs} from "react-router-dom";

const booksLoader = async ({request: {signal}}: LoaderFunctionArgs) => {
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