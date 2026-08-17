import {Button, Card, Col, FormControl, FormGroup, FormLabel, Image, InputGroup, Row} from "react-bootstrap";
import {Await, Form, type LoaderFunctionArgs, NavLink, redirect, useActionData, useLoaderData} from "react-router-dom";
import {Suspense, useState} from "react";
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
    const {bookPromise} = useLoaderData() as { bookPromise: Promise<IBookResponse | null> };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={bookPromise}>
                {(book: IBookResponse | null) => <BooksForm book={book}/>}
            </Await>
        </Suspense>
    );
};

const BooksForm = ({book}: { book: IBookResponse | null }) => {
    const errors = useActionData() as BooksFormErrors | undefined;

    const [coverUrl, setCoverUrl] = useState<string>(book?.coverUrl ?? "");
    const [isbn, setIsbn] = useState<string>(book?.isbn10 || book?.isbn13 || "");
    const [title, setTitle] = useState<string>(book?.title ?? "");
    const [author, setAuthor] = useState<string>(book?.author ?? "");
    const [year, setYear] = useState<number | undefined>(book?.publishedYear);

    const handleSearchByIsbn = async () => {
        const book: IBookResponse = await booksService.getBookByIsbn(isbn);
        setCoverUrl(book.coverUrl ?? "");
        setTitle(book.title);
        setAuthor(book.author);
        setYear(book.publishedYear);
    };

    return (
        <div>
            <h1>{book ? "Edit book" : "Add book"}</h1>
            <Card className="shadow">
                <Card.Body>
                    <Row>
                        <Col sm={2}>
                            <Image src={coverUrl || undefined} className="img-fluid object-fit-scale" alt={book?.title}
                                   rounded/>
                        </Col>
                        <Col sm={6}>
                            <Form method="post">
                                <input type="hidden" name="bookId" value={book?.id}/>
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
                                        variant="success"
                                        className="me-2"
                                    >
                                        {book ? "Save" : "Add"}
                                    </Button>
                                    <NavLink className="btn btn-secondary" to="..">Cancel</NavLink>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

const action = async ({request}: LoaderFunctionArgs) => {
    const formData = await request.formData();
    const {
        isbn,
        title,
        author,
        publishedYear,
        coverUrl,
        bookId
    } = Object.fromEntries(formData) as Record<string, string>;
    if (!author)
        return {errors: {author: true}};

    if (!title)
        return {errors: {title: true}};

    if (bookId) {
        await booksService.updateBook(Number(bookId), {
            title,
            author,
            coverUrl: coverUrl || undefined,
            isbn10: isbn.length === 10 ? isbn : undefined,
            isbn13: isbn.length === 13 ? isbn : undefined,
            publishedYear: publishedYear ? Number(publishedYear) : undefined
        }, request.signal);
    } else {
        await booksService.createBook({
            title,
            author,
            coverUrl: coverUrl || undefined,
            isbn10: isbn.length === 10 ? isbn : undefined,
            isbn13: isbn.length === 13 ? isbn : undefined,
            publishedYear: publishedYear ? Number(publishedYear) : undefined
        }, request.signal);
    }

    return redirect('/');
};

const loader = ({params}: LoaderFunctionArgs) => {
    const {bookId} = params;

    const bookPromise = bookId
        ? booksService.getBookById(Number(bookId))
        : Promise.resolve(null);

    return {bookPromise};
};

export const booksFormPageRoute = {
    Component: BooksFormPage,
    action: action,
    loader
};