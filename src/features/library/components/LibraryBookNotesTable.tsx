import {Button, Table} from "react-bootstrap";
import {formatDateToLocale} from "../../../utils/dateUtils.ts";
import {Await, type LoaderFunctionArgs, NavLink, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import type {IBookNote} from "../types";
import notesService from "../services/notesService.ts";

const LibraryBookNotesTable = () => {
    const {notesPromise}: { notesPromise: Promise<IBookNote[]> } = useLoaderData();

    return (
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
                    {(bookNotes) => bookNotes.map(note => (
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
                                <Button variant="danger" size="sm">
                                    <span className="bi bi-trash"></span>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </Await>
            </Suspense>
            </tbody>
        </Table>
    );
};

const loader = async ({params, request: {signal}}: LoaderFunctionArgs) => {
    const notesPromise = notesService.getNotesByBookId(Number(params.bookId), signal);
    return {notesPromise};
};

export const libraryBookNotesTableRoute = {loader, element: <LibraryBookNotesTable/>};