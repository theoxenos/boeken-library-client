import {Button, Card, Col, FormControl, InputGroup, ListGroup, Placeholder, Row} from "react-bootstrap";
import LibraryPageDefaultDetailCard from "./LibraryPageDefaultDetailCard.tsx";

const LibraryPageSkeleton = () => {
    return (
        <Row>
            <Col sm={12} md={3} className="mb-3 mb-md-0">
                <Card>
                    <Card.Body>
                        <InputGroup className="mb-3">
                            <FormControl id="search-input" name="title"/>
                            <Button type="submit" variant="outline-secondary">
                                <span className="bi bi-search"></span>
                            </Button>
                        </InputGroup>
                        <ListGroup>
                            {Array.from({length: 5}).map((_, index) => <ListGroup.Item key={index}>
                                <Placeholder xs={8}/>
                            </ListGroup.Item>)}
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
            <Col sm={12} md={9}>
                <LibraryPageDefaultDetailCard/>
            </Col>
        </Row>
    );
};

export default LibraryPageSkeleton;