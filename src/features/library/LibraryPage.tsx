import {Col, Row} from "react-bootstrap";
import {Await, useLoaderData} from "react-router-dom";
import {Suspense, useEffect, useState} from "react";
import type {ILibraryBook} from "./types";
import notesService from "./services/notesService.ts";
import LibraryBookSearch from "./components/LibraryBookSearch.tsx";
import LibraryBookDetail from "./components/LibraryBookDetail.tsx";

const LibraryPage = () => {
    const {booksPromise} = useLoaderData();
    const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
    const [bookNotes, setBookNotes] = useState<[]>([]);

    useEffect(() => {
        if (!selectedBookId) {
            return;
        }

        const getNotesForBook = async () => {
            const data = await notesService.getNotesForBook(selectedBookId);
            setBookNotes(data);
        };

        void getNotesForBook();
    }, [selectedBookId])

    // const statusesDict = {
    //     'To read': 'to-read',
    //     'Reading': 'reading',
    //     'Read': 'read',
    // } as const;

    return (
        <Row>
            <Suspense fallback={<div>Loading...</div>}>
                <Await resolve={booksPromise}>
                    {(books: ILibraryBook[]) => (
                        <>
                            <Col sm={12} md={3} className="">
                                <LibraryBookSearch books={books} setSelectedBookId={setSelectedBookId}/>
                            </Col>
                            <Col sm={12} md={9} className="">
                                <LibraryBookDetail key={selectedBookId}
                                                   books={books}
                                                   selectedBookId={selectedBookId!}
                                                   bookNotes={bookNotes}
                                />
                            </Col>
                        </>
                    )}
                </Await>
            </Suspense>
        </Row>
    );
};

export default LibraryPage;