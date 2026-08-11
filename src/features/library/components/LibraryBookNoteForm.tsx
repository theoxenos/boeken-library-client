import {Form} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import type {IBookNote} from "../types";

type TNoteFormProps = {
    note?: IBookNote;
    onCancel: () => void;
}

const LibraryBookNoteForm = ({note, onCancel}: TNoteFormProps) => {

    return (
        <>
            <h4 className="mb-3">{note ? "Edit Note" : "Add Note"}</h4>
            <Form method="post">
                <input type="hidden" name="id" defaultValue={note?.id}/>
                <FormGroup controlId="noteTitle" className="mb-3">
                    <FormLabel>Title</FormLabel>
                    <FormControl type="text" placeholder="Title" name="title" defaultValue={note?.title} required/>
                </FormGroup>
                <FormGroup controlId="noteContent" className="mb-3">
                    <FormLabel>Content</FormLabel>
                    <FormControl as="textarea" rows={3} placeholder="Content" name="content"
                                 defaultValue={note?.content} required/>
                </FormGroup>
                <div className="mb-3">
                    <Button variant="success" type="submit" className="me-2">Save</Button>
                    <Button variant="danger" type="button" onClick={onCancel}>Cancel</Button>
                </div>
            </Form>
        </>
    );
};

export default LibraryBookNoteForm;
