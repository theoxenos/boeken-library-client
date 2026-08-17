import {Card} from "react-bootstrap";
import {Suspense} from "react";
import {Await, type LoaderFunctionArgs, NavLink, Outlet, useLoaderData, useLocation} from "react-router-dom";
import type {IBook} from "../../books/types";
import booksService from "../../books/services/booksService.ts";

const LibraryBookDetail = () => {
    const {bookPromise} = useLoaderData();
    const location = useLocation();
    const isNoteForm = location.pathname.includes('notes');

    return (
        <Card>
            <Card.Header className="d-flex">
                <Suspense fallback={<div>Loading...</div>}>
                    <Await resolve={bookPromise}>
                        {(book: IBook) => {
                            return (
                                <div className="me-auto">
                                    Notes for {book.title}
                                </div>
                            );
                        }}
                    </Await>
                    {!isNoteForm && (
                        <NavLink to="notes/new" className="btn btn-sm btn-success">
                            <span className="bi bi-plus"></span>
                        </NavLink>
                    )}
                    {isNoteForm && (
                        <NavLink to={'.'} className="btn btn-sm btn-secondary">
                            <span className="bi bi-arrow-left"></span>
                        </NavLink>
                    )}
                </Suspense>
            </Card.Header>
            <Card.Body>
                <Outlet/>
            </Card.Body>
        </Card>
    );
};


const loader = async ({params, request: {signal}}: LoaderFunctionArgs) => {
    const bookId = Number(params.bookId);
    const bookPromise = booksService.getBookById(bookId, signal);

    return {bookPromise};
};

export const libraryBookDetailRoute = {loader, Component: LibraryBookDetail};