import type {IBook} from "../types";
import {Col, Image, Row, Button} from "react-bootstrap";

type TBookItemProps = {
    book: IBook;
    onRemoveFromLibrary: (bookId: number) => void;
    onAddToLibrary: (bookId: number) => void;
};

const BookItem = ({book, onRemoveFromLibrary, onAddToLibrary}: TBookItemProps) => {
    return (
        <Row xs={2} sm={2} md={1} className="g-2">
            <Col>
                <Image
                    src={book.coverUrl?.replace('L', 'M')}
                    alt={`Cover of ${book.title}`}
                    className=""
                    style={{width: '180px', height: '290px', objectFit: 'cover'}}
                />
            </Col>
            <Col>
                <div className="fw-bold">{book.title}</div>
                <div className="text-muted">{book.author}</div>
                <div className="text-secondary">{book.publishedYear}</div>
            </Col>
            <div className="d-flex flex-row justify-content-between">
                <div>
                    4/5
                </div>
                {/*<div>*/}
                {/*    12*/}
                {/*</div>*/}
                <div>
                    {book.isInLibrary
                        ? (
                            <Button type="button" variant="outline-danger" size="sm"
                                    onClick={() => onRemoveFromLibrary(book.id)}>Remove from library</Button>
                        ) : (
                            <Button type="button" variant="outline-success" size="sm"
                                    onClick={() => onAddToLibrary(book.id)}>Add to library</Button>
                        )}
                </div>
            </div>
        </Row>
    );
};

export default BookItem;