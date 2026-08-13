import type {IBook} from "../types";
import {Col, Image, Row} from "react-bootstrap";
import StarRating from "./StarRatingComponent.tsx";
import {NavLink} from "react-router-dom";

type TBookItemProps = {
    book: IBook;
    onRemoveFromLibrary: (bookId: number) => void;
    onAddToLibrary: (bookId: number) => void;
    onSetRating: (bookId: number, rating: number) => void;
};

const BookItem = ({book, onRemoveFromLibrary, onAddToLibrary, onSetRating}: TBookItemProps) => {
    const rating = book.averageRating ?? 0;
    const handleRatingChange = (newRating: number) => {
        onSetRating(book.id, newRating);
    };

    const formatPublishedYear = (year?: number) => {
        if (Number(year) < 0) {
            return `${Math.abs(year!)} BC`
        }
        return year?.toString();
    };

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
                <div className="text-muted">
                    <NavLink to={`/?searchText=${book.author}&searchType=author`}>{book.author}</NavLink>
                </div>
                <div className="text-secondary">{formatPublishedYear(book.publishedYear)}</div>
            </Col>
            <div className="d-flex align-items-center gap-2">
                <StarRating value={rating} onChange={handleRatingChange}/>
                {rating > 0 && (
                    <small className="text-muted">{rating} / 5</small>
                )}
            </div>
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