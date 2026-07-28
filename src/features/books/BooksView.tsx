import {Await, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import type {IBook} from "./types";
import BookItem from "./components/BookItem.tsx";

const BooksView = () => {
    const {books: booksPromise} = useLoaderData();
    return (
        <>
            <h1>hoi</h1>
            <div className="row row-cols-1 row-cols-md-4 row-cols-lg-6 g-3">
                <Suspense fallback={<div>Loading...</div>}>
                    <Await resolve={booksPromise}>
                        {(books: IBook[]) => books.map((book) => (
                            <div key={book.id} className="col mb-3 h-100">
                                <BookItem book={book}/>
                            </div>
                        ))}
                    </Await>
                </Suspense>
            </div>
        </>
    );
};

export default BooksView;