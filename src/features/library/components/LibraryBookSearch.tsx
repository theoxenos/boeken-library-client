import {Button, Card, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import type {ILibraryBook} from "../types";

type TLibraryBookSearchProps = {
    books: ILibraryBook[];
    setSelectedBookId: (bookId: number) => void;
}

const LibraryBookSearch = ({books, setSelectedBookId}: TLibraryBookSearchProps) => {
    return (
        <Card>
            <Card.Body>
                <InputGroup className="mb-3">
                    <FormControl id="search-input"/>
                    <Button variant="outline-secondary">Search</Button>
                </InputGroup>
                <ListGroup>
                    {books.map(book => (
                        <ListGroup.Item key={book.bookId}>
                            <Button variant=""
                                    size="sm"
                                    className="text-start"
                                    onClick={() => setSelectedBookId(book.bookId)}
                            >
                                {book.title} ({book.publishedYear})
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default LibraryBookSearch;