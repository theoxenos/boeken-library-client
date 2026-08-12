import {Card} from "react-bootstrap";

const LibraryPageDefaultDetailCard = () => (
    <Card>
        <Card.Header className="d-flex">
            <div className="text-muted">No book selected</div>
        </Card.Header>
        <Card.Body className="py-5 text-center">
            <span className="bi bi-book" style={{fontSize: "6rem"}}></span>
            <div className="text-muted">Please select a book to view its notes</div>
        </Card.Body>
    </Card>
);

export default LibraryPageDefaultDetailCard;