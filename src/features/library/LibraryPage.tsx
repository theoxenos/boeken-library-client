import {Col, Row} from "react-bootstrap";
import {Await, type LoaderFunctionArgs, Outlet, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import type {ILibraryBook} from "./types";
import LibraryBookSearch from "./components/LibraryBookSearch.tsx";
import libraryService from "./services/libraryService.ts";

const LibraryPage = () => {
    const {booksPromise} = useLoaderData();

    return (
        <Row>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={booksPromise}>
                    {(books: ILibraryBook[]) => (
                        <>
                            <Col sm={12} md={3}>
                                <LibraryBookSearch books={books}/>
                            </Col>
                            <Col sm={12} md={9}>
                                <Outlet/>
                            </Col>
                        </>
                    )}
                </Await>
            </Suspense>
        </Row>
    );
};

const loader = async ({request: {signal}}: LoaderFunctionArgs) => {
    const booksPromise = libraryService.getBooksFromLibrary(signal);

    return {booksPromise};
};

export const libraryPageRoute = {loader, element: <LibraryPage/>};