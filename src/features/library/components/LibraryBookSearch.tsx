import {Button, Card, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import type {ILibraryBook} from "../types";
import {NavLink, type NavLinkRenderProps} from "react-router-dom";


type TLibraryBookSearchProps = {
    books: ILibraryBook[];
}

const LibraryBookSearch = ({books}: TLibraryBookSearchProps) => {

    const getCssClasses = ({isActive}: NavLinkRenderProps) => {
        if (isActive) {
            const activeClasses = [
                'nav-link',
                'fw-semibold',
                'pb-1',
                'border-2',
                'border-bottom',
                'border-info',
            ]
            return activeClasses.join(' ');
        }

        return 'nav-link';
    };

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
                            <NavLink
                                to={`/library/books/${book.bookId}`}
                                className={getCssClasses}
                            >
                                {book.title} ({book.publishedYear})
                            </NavLink>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card.Body>
        </Card>
    );
};

export default LibraryBookSearch;