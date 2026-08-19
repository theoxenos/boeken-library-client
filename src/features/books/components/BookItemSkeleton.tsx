import {Col, Placeholder, Row} from "react-bootstrap";

const BookItemSkeleton = () => {
    return (
        <Row xs={2} sm={2} md={1} className="g-2" aria-hidden="true" aria-label="Loading books">
            <Col>
                <Placeholder style={{height: '200px'}} xs={9}/>
            </Col>
            <Col>
                <Placeholder xs={8}/>
                <Placeholder xs={6}/>
                <Placeholder xs={4}/>
            </Col>
            <div>
                <Placeholder xs={5}/>
            </div>
            <div>
                <Placeholder.Button variant="secondary" xs={6}/>
            </div>
        </Row>
    );
};

export default BookItemSkeleton;