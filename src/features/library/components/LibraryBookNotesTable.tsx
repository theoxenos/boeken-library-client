import {Button, Modal, Table} from "react-bootstrap";
import {formatDateToLocale} from "../../../utils/dateUtils.ts";
import {Await, Form, type LoaderFunctionArgs, NavLink, redirect, useLoaderData, useNavigation} from "react-router-dom";
import {Suspense, useEffect, useState} from "react";
import type {IBookNote} from "../types";
import notesService from "../services/notesService.ts";

const LibraryBookNotesTable = () => {
    const {notesPromise}: { notesPromise: Promise<IBookNote[]> } = useLoaderData();
    const [noteToDelete, setNoteToDelete] = useState<IBookNote | null>(null);
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state === 'idle' && noteToDelete !== null) {
            setNoteToDelete(null);
        }
    }, [navigation.state]);

    return (
        <>
            <Table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Created</th>
                    <th>Updated</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <Suspense>
                    <Await resolve={notesPromise}>
                        {(bookNotes: IBookNote[]) =>
                            bookNotes.map(note => (
                                <tr key={note.id}>
                                    <td>{note.title}</td>
                                    <td>
                                        {formatDateToLocale(note.createdAt, {
                                            locale: 'nl-NL',
                                            options: {dateStyle: 'short', timeStyle: 'short'}
                                        })}
                                    </td>
                                    <td>
                                        {formatDateToLocale(note.updatedAt, {
                                            locale: 'nl-NL',
                                            options: {dateStyle: 'short', timeStyle: 'short'}
                                        })}
                                    </td>
                                    <td>
                                        <NavLink to={`notes/${note.id}/edit`} className="btn btn-sm btn-primary me-2">
                                            <span className="bi bi-pencil"></span>
                                        </NavLink>
                                        <Button variant="danger" size="sm" onClick={() => setNoteToDelete(note)}>
                                            <span className="bi bi-trash"></span>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                    </Await>
                </Suspense>
                </tbody>
            </Table>

            <Modal show={!!noteToDelete} onHide={() => setNoteToDelete(null)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete <strong>{noteToDelete?.title}</strong>?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setNoteToDelete(null)}>Cancel</Button>
                    <Form method="post">
                        <input type="hidden" name="noteId" value={noteToDelete?.id}/>
                        <Button variant="danger" type="submit"
                                disabled={navigation.state === 'submitting'}>Delete</Button>
                    </Form>
                </Modal.Footer>
            </Modal>
        </>
    );
};

const action = async ({params, request}: LoaderFunctionArgs) => {
    const formData = await request.formData();
    const noteId = formData.get("noteId");
    if (noteId) {
        await notesService.deleteNote(Number(noteId));
    }
    return redirect(`/library/books/${params.bookId}`);
}

const loader = async ({params, request: {signal}}: LoaderFunctionArgs) => {
    const notesPromise = notesService.getNotesByBookId(Number(params.bookId), signal);
    return {notesPromise};
};

export const libraryBookNotesTableRoute = {action, loader, element: <LibraryBookNotesTable/>};