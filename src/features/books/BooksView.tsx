import {Await, useLoaderData, useRevalidator} from "react-router-dom";
import {Suspense} from "react";
import type {IBook} from "./types";
import BookItem from "./components/BookItem.tsx";
import libraryService from "../library/services/libraryService.ts";

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
        <>
            <h1>hoi</h1>
            <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 g-3">
                <Suspense fallback={<div>Loading...</div>}>
                    <Await resolve={booksPromise}>
                        {(books: IBook[]) => books.map((book) => (
                            <div key={book.id} className="col mb-3 h-100">
                                <BookItem book={book} onAddToLibrary={handleAddToLibrary}
                                          onRemoveFromLibrary={handleRemoveFromLibrary}/>
                            </div>
                        ))}
                    </Await>
                </Suspense>
            </div>
        </>
    );
};

export default BooksView;