import {Await, Form, type LoaderFunctionArgs, NavLink, redirect, useLoaderData, useParams} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import type {IBookNote} from "../types";
import {Suspense} from "react";
import notesService from "../services/notesService.ts";

const LibraryBookNoteForm = () => {
    const {notePromise} = useLoaderData() as { notePromise: Promise<IBookNote | null> };
    const {bookId} = useParams();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={notePromise}>
                {(note) => (
                    <>
                        <h4 className="mb-3">{note ? "Edit Note" : "Add Note"}</h4>
                        <Form method="post">
                            <input type="hidden" name="id" defaultValue={note?.id}/>
                            <input type="hidden" name="bookId" defaultValue={bookId}/>
                            <FormGroup controlId="noteTitle" className="mb-3">
                                <FormLabel>Title</FormLabel>
                                <FormControl type="text" placeholder="Title" name="title" defaultValue={note?.title}
                                             required/>
                            </FormGroup>
                            <FormGroup controlId="noteContent" className="mb-3">
                                <FormLabel>Content</FormLabel>
                                <FormControl as="textarea" rows={3} placeholder="Content" name="content"
                                             defaultValue={note?.content} required/>
                            </FormGroup>
                            <div className="mb-3">
                                <Button variant="success" type="submit" className="me-2">Save</Button>
                                <NavLink className="btn btn-danger" to={'..'}>Cancel</NavLink>
                            </div>
                        </Form>
                    </>
                )}
            </Await>
        </Suspense>
    );
};

const action = async ({request}: LoaderFunctionArgs) => {
    const formData = await request.formData();
    const {id, bookId, title, content} = Object.fromEntries(formData);
    const isNewNote = !id;

    if (isNewNote) {
        await notesService.createNote({
            bookId: Number(bookId),
            title: title.toString().trim(),
            content: content.toString().trim()
        });
    } else {
        await notesService.updateNote({
            id: Number(id),
            bookId: Number(bookId),
            title: title.toString().trim(),
            content: content.toString().trim()
        });
    }

    return redirect(`/library/books/${bookId}`);
};

const loader = ({params}: LoaderFunctionArgs) => {
    const {noteId} = params;

    return {notePromise: noteId ? notesService.getNoteById(Number(noteId)) : Promise.resolve(null)};
};

export const noteFormRoute = {
    Component: LibraryBookNoteForm,
    loader,
    action
};