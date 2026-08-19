import {Col, Row} from "react-bootstrap";
import BookItemSkeleton from "./BookItemSkeleton.tsx";

const BooksViewSkeleton = () => {
    return (
        <Row xs={1} md={4} lg={6} className="g-3 w-100">
            {Array.from({length: 12}).map((_, index) => (
                <Col key={index} className="mb-3">
                    <BookItemSkeleton/>
                </Col>
            ))}
        </Row>
    )
};

export default BooksViewSkeleton;