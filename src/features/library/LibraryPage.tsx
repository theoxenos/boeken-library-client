import {Col, Row} from "react-bootstrap";
import {Await, type LoaderFunctionArgs, Outlet, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import type {ILibraryBook} from "./types";
import LibraryBookSearch from "./components/LibraryBookSearch.tsx";
import libraryService from "./services/libraryService.ts";
import LibraryPageSkeleton from "./components/LibraryPageSkeleton.tsx";

const LibraryPage = () => {
    const {booksPromise} = useLoaderData();

    return (
        <Row>
            <Suspense fallback={<LibraryPageSkeleton/>}>
                <Await resolve={booksPromise}>
                    {(books: ILibraryBook[]) => (
                        <>
                            <Col sm={12} md={3} className="mb-3 mb-md-0">
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

const loader = async ({request: {signal, url}}: LoaderFunctionArgs) => {
    const urlParams = new URL(url).searchParams;
    const {title, sortBy, sortOrder} = Object.fromEntries(urlParams);
    
    const params: Record<string, string> = {};
    if (title) params.title = title;
    if (sortBy) params.sortBy = sortBy;
    if (sortOrder) params.sortOrder = sortOrder;

    const booksPromise = libraryService.getBooksFromLibrary(Object.keys(params).length > 0 ? params : undefined, signal);

    return {booksPromise};
};

export const libraryPageRoute = {loader, Component: LibraryPage};