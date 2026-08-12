import {Button, Card, Col, FormControl, FormGroup, FormLabel, Image, InputGroup, Row} from "react-bootstrap";
import {Form, useActionData} from "react-router-dom";
import {useState} from "react";
import booksService from "./services/booksService.ts";
import type {IBookResponse} from "./types";

type BooksFormErrors = {
    errors: {
        isbn?: boolean;
        title?: boolean;
        author?: boolean;
        publishedYear?: boolean;
        coverUrl?: boolean;
    }
}

const BooksFormPage = () => {
    const errors = useActionData() as BooksFormErrors | undefined;

    const [coverUrl, setCoverUrl] = useState<string>("");
    const [isbn, setIsbn] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [author, setAuthor] = useState<string>("");
    const [year, setYear] = useState<number>();

    const handleSearchByIsbn = async () => {
        const book: IBookResponse = await booksService.getBookByIsbn(isbn);
        setCoverUrl(book.coverUrl ?? "");
        setTitle(book.title);
        setAuthor(book.author);
        setYear(book.publishedYear);
    };

    return (
        <div>
            <h1>Add book</h1>
            <Card className="shadow">
                <Card.Body>
                    <Row>
                        <Col sm={2}>
                            <Image src={coverUrl || undefined} className="img-fluid object-fit-scale" rounded/>
                        </Col>
                        <Col sm={6}>
                            <Form method="post">
                                <FormGroup controlId="bookIsbn" className="mb-3">
                                    <FormLabel>ISBN</FormLabel>
                                    <InputGroup>
                                        <FormControl
                                            name="isbn"
                                            type="number"
                                            min={0}
                                            placeholder="Enter ISBN"
                                            value={isbn}
                                            onChange={(e) => setIsbn(e.target.value)}
                                        />
                                        <Button type="button" variant="outline-secondary"
                                                onClick={handleSearchByIsbn}>Search</Button>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup controlId="bookTitle" className="mb-3">
                                    <FormLabel>Title</FormLabel>
                                    <FormControl
                                        name="title"
                                        type="text"
                                        placeholder="Enter title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        isInvalid={errors?.errors.title}
                                    />
                                    <FormControl.Feedback type="invalid">
                                        Please enter a valid title.
                                    </FormControl.Feedback>
                                </FormGroup>
                                <FormGroup controlId="bookAuthor" className="mb-3">
                                    <FormLabel>Author</FormLabel>
                                    <FormControl
                                        name="author"
                                        type="text"
                                        placeholder="Enter author"
                                        value={author}
                                        onChange={(e) => setAuthor(e.target.value)}
                                        isInvalid={errors?.errors.author}
                                    />
                                    <FormControl.Feedback type="invalid">
                                        Please enter a valid author.
                                    </FormControl.Feedback>
                                </FormGroup>
                                <FormGroup controlId="bookYear" className="mb-3">
                                    <FormLabel>Published Year</FormLabel>
                                    <FormControl
                                        name="publishedYear"
                                        type="number"
                                        placeholder="Enter year"
                                        value={year}
                                        onChange={(e) => setYear(Number(e.target.value))}
                                    />
                                </FormGroup>
                                <FormGroup controlId="bookCover" className="mb-3">
                                    <FormLabel>Cover URL</FormLabel>
                                    <FormControl
                                        name="coverUrl"
                                        type="text"
                                        placeholder="Enter cover URL"
                                        value={coverUrl}
                                        onChange={(e) => setCoverUrl(e.target.value)}
                                    />
                                </FormGroup>
                                <div className="mt-3">
                                    <Button
                                        type="submit"
                                        variant="primary"
                                    >
                                        Add
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BooksFormPage;