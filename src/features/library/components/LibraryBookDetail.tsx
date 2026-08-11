import {Button, Card} from "react-bootstrap";
import type {IBookNote, ILibraryBook} from "../types";
import LibraryBookNotesTable from "./LibraryBookNotesTable.tsx";
import {useState} from "react";
import LibraryBookNoteForm from "./LibraryBookNoteForm.tsx";

type TLibraryBookDetailProps = {
    books: ILibraryBook[];
    selectedBookId: number;
    bookNotes: IBookNote[];
};

const LibraryBookDetail = ({books, selectedBookId, bookNotes}: TLibraryBookDetailProps) => {
    const [bookDetailState, setBookDetailState] = useState<'detail' | 'create' | 'edit'>('detail');
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

    const handleCreateNewNote = () => {
        setSelectedNoteId(null);
        setBookDetailState('create');
    };

    const handleEditNote = (noteId: number) => {
        setSelectedNoteId(noteId);
        setBookDetailState('edit');
    };

    const handleBackToDetail = () => {
        setBookDetailState('detail');
        setSelectedNoteId(null);
    };

    if (!selectedBookId) {
        return (
            <Card>
                <Card.Header className="d-flex">
                    <div className="text-muted">No book selected</div>
                </Card.Header>
                <Card.Body className="py-5 text-center">
                    <span className="bi bi-book" style={{fontSize: "6rem"}}></span>
                    <div className="text-muted">Please select a book to view its notes</div>
                </Card.Body>
            </Card>
        )
    }

    return (
        <Card>
            <Card.Header className="d-flex">
                <div className="me-auto">
                    Notes for {books.find(b => b.bookId === selectedBookId)?.title}
                </div>
                {bookDetailState === 'detail' && (
                    <Button variant="success" size="sm" onClick={handleCreateNewNote}>
                        <span className="bi bi-plus"></span>
                    </Button>
                )}
                {bookDetailState !== 'detail' && (
                    <Button variant="secondary" size="sm" onClick={handleBackToDetail}>
                        <span className="bi bi-arrow-left"></span>
                    </Button>
                )}
            </Card.Header>
            <Card.Body>
                {bookDetailState === 'detail' && (
                    <LibraryBookNotesTable
                        bookNotes={bookNotes}
                        editNote={handleEditNote}
                        deleteNote={() => alert('not implemented')}
                    />
                )}
                {(bookDetailState === 'create' || bookDetailState === 'edit') && (
                    <LibraryBookNoteForm
                        note={bookDetailState === 'edit'
                            ? bookNotes.find(n => n.id === selectedNoteId)!
                            : undefined
                        }
                        onCancel={handleBackToDetail}
                    />
                )}
            </Card.Body>
        </Card>
    );
};


export default LibraryBookDetail;