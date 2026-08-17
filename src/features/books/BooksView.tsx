import {Await, type LoaderFunctionArgs, useLoaderData, useRevalidator} from "react-router-dom";
import {Suspense} from "react";
import type {IBook} from "./types";
import BookItem from "./components/BookItem.tsx";
import libraryService from "../library/services/libraryService.ts";
import {Col, Row} from "react-bootstrap";
import booksService from "./services/booksService.ts";

const BooksView = () => {
    const {books: booksPromise} = useLoaderData();
    const {revalidate} = useRevalidator();

    const handleAddToLibrary = async (bookId: number) => {
        await libraryService.addToLibrary(bookId);
        await revalidate();
    };

    const handleRemoveFromLibrary = async (bookId: number) => {
        await libraryService.removeFromLibrary(bookId);
        await revalidate();
    };

    const handleSetRating = async (bookId: number, rating: number) => {
        await libraryService.updateLibraryBook(bookId, rating);
        await revalidate();
    };

    return (
        <Row xs={1} md={4} lg={6} className="g-3">
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={booksPromise}>
                    {(books: IBook[]) => books.map((book) => (
                        <Col key={book.id} className="mb-3 h-100">
                            <BookItem book={book}
                                      onAddToLibrary={handleAddToLibrary}
                                      onRemoveFromLibrary={handleRemoveFromLibrary}
                                      onSetRating={handleSetRating}/>
                        </Col>
                    ))}
                </Await>
            </Suspense>
        </Row>
    );
};

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
    Component: BooksView
};