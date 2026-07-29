import {Await, useLoaderData, useRevalidator} from "react-router-dom";
import {Suspense} from "react";
import type {IBook} from "./types";
import BookItem from "./components/BookItem.tsx";
import libraryService from "../library/services/libraryService.ts";
import {Col, Row} from "react-bootstrap";

const BooksView = () => {
    const {books: booksPromise} = useLoaderData();
    const { revalidate } = useRevalidator();

    const handleAddToLibrary = async (bookId: number) => {
        await libraryService.addToLibrary(bookId);
        await revalidate();
    };

    const handleRemoveFromLibrary = async (bookId: number) => {
        await libraryService.removeFromLibrary(bookId);
        await revalidate();
    };

    return (
        <Row xs={1} md={4} lg={6} className="g-3">
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={booksPromise}>
                    {(books: IBook[]) => books.map((book) => (
                        <Col key={book.id} className="mb-3 h-100">
                            <BookItem book={book} onAddToLibrary={handleAddToLibrary}
                                      onRemoveFromLibrary={handleRemoveFromLibrary}/>
                        </Col>
                    ))}
                </Await>
            </Suspense>
        </Row>
    );
};

export default BooksView;