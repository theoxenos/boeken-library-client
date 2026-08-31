import {Await, type LoaderFunctionArgs, useLoaderData, useRevalidator, useSearchParams} from "react-router-dom";
import {Suspense} from "react";
import type {IBook} from "./types";
import BookItem from "./components/BookItem.tsx";
import libraryService from "../library/services/libraryService.ts";
import {Col, Row} from "react-bootstrap";
import booksService from "./services/booksService.ts";
import BooksViewSkeleton from "./components/BooksViewSkeleton.tsx";
import BookSearchForm from "./components/BookSearchForm.tsx";
import BookSortSelector from "./components/BookSortSelector.tsx";
import useNotification from "../notification/hooks/useNotification.tsx";

const BooksView = () => {
    const {books: booksPromise} = useLoaderData();
    const {revalidate} = useRevalidator();
    const [searchParams] = useSearchParams();
    const {searchText = '', searchType = 'title'} = Object.fromEntries(searchParams);
    const {setNotification} = useNotification();

    const handleAddToLibrary = async (bookId: number) => {
        try {
            await libraryService.addToLibrary(bookId);
            await revalidate();
            setNotification('Book added to library', 'success');
        } catch (error) {
            console.error('Error adding book to library:', error);
            setNotification('Error adding book to library', 'danger');
        }
    };

    const handleRemoveFromLibrary = async (bookId: number) => {
        try {
            await libraryService.removeFromLibrary(bookId);
            await revalidate();
            setNotification('Book removed from library', 'success');
        } catch (error) {
            console.error('Error removing book from library:', error);
            setNotification('Error removing book from library', 'danger');
        }
    };

    const handleSetRating = async (bookId: number, rating: number) => {
        try {
            await libraryService.updateLibraryBook(bookId, rating);
            await revalidate();
            setNotification('Book rating updated', 'success');
        } catch (error) {
            console.error('Error setting book rating:', error);
            setNotification('Error setting book rating', 'danger');
        }
    };

    return (
        <>
            <Row xs={1} className="justify-content-center mb-4">
                <Col xs={7}>
                    <BookSearchForm searchText={searchText} searchType={searchType}/>
                </Col>
                <Col xs={3}>
                    <BookSortSelector/>
                </Col>
            </Row>
            <Row xs={1} md={4} lg={6} className="g-3">
                <Suspense fallback={<BooksViewSkeleton/>}>
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
        </>
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