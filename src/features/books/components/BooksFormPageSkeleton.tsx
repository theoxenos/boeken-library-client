import {Card, Col, Row, Spinner} from "react-bootstrap";

const BooksFormPageSkeleton = ({isEdit}: { isEdit: boolean }) => (
    <>
        <h1>{isEdit ? "Edit book" : "Add book"}</h1>
        <Card className="shadow">
            <Card.Body>
                <Row style={{minHeight: "500px"}}>
                    <Col sm={2}>
                    </Col>
                    <Col sm={6} className="d-flex justify-content-center align-items-center">
                        <Spinner/>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </>
);

export default BooksFormPageSkeleton;