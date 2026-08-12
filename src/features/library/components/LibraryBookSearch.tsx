import {Button, Card, FormControl, InputGroup, ListGroup} from "react-bootstrap";
import type {ILibraryBook} from "../types";
import {Form, NavLink, type NavLinkRenderProps, useSearchParams} from "react-router-dom";

type TLibraryBookSearchProps = {
    books: ILibraryBook[];
}

const LibraryBookSearch = ({books}: TLibraryBookSearchProps) => {
    const [searchParams] = useSearchParams();

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

    const buildBookLink = (bookId: number) => {
        const query = new URLSearchParams(searchParams)
        const queryValue = query.get('title');
        return `/library/books/${bookId}${queryValue ? `?title=${queryValue}` : ''}`;
    };

    return (
        <Card>
            <Card.Body>
                <Form method="get">
                    <InputGroup className="mb-3">
                        <FormControl id="search-input" name="title" defaultValue={searchParams.get('title') ?? ''}/>
                        <Button type="submit" variant="outline-secondary">
                            <span className="bi bi-search"></span>
                        </Button>
                    </InputGroup>
                    <ListGroup>
                        {books.map(book => (
                            <ListGroup.Item key={book.bookId}>
                                <NavLink
                                    to={buildBookLink(book.bookId)}
                                    className={getCssClasses}
                                >
                                    {book.title} ({book.publishedYear})
                                </NavLink>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default LibraryBookSearch;