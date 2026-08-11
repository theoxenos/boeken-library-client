import {Button, Table} from "react-bootstrap";
import {formatDateToLocale} from "../../../utils/dateUtils.ts";
import type {IBookNote} from "../types";

type LibraryBookNotesTableProps = {
    bookNotes: IBookNote[];
    deleteNote: (id: number) => void;
    editNote: (id: number) => void;
}

const LibraryBookNotesTable = ({bookNotes, deleteNote, editNote}: LibraryBookNotesTableProps) => (
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
        {bookNotes.map(note => (
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
                    <Button variant="primary" size="sm" className="me-2" onClick={() => editNote(note.id)}>
                        <span className="bi bi-pencil"></span>
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => deleteNote(note.id)}>
                        <span className="bi bi-trash"></span>
                    </Button>
                </td>
            </tr>
        ))}
        </tbody>
    </Table>
);

export default LibraryBookNotesTable;