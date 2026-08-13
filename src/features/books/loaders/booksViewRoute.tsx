import booksService from "../services/booksService.ts";
import BooksView from "../BooksView.tsx";
import RequireAuth from "../../components/RequireAuth.tsx";
import type {LoaderFunctionArgs} from "react-router-dom";

const booksLoader = async ({request: {signal, url}}: LoaderFunctionArgs) => {
    const searchParams = new URL(url).searchParams;
    const {searchText, searchType, sortBy, sortOrder} = Object.fromEntries(searchParams);

    const params: Record<string, string> = {};
    if (searchText) {
        params[searchType] = searchText;
    }
    if (sortBy) {
        params.sortBy = sortBy;
    }
    if (sortOrder) {
        params.sortOrder = sortOrder;
    }

    const books = booksService.getAllBooks(signal, Object.keys(params).length > 0 ? params : undefined);

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