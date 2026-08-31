import {Form} from "react-router-dom";
import {Button, FormControl, FormSelect, InputGroup} from "react-bootstrap";

type BookSearchFormProps = {
    searchText: string,
    searchType: string,
}

const BookSearchForm = ({searchText, searchType}: BookSearchFormProps) => (
    <Form>
        <InputGroup>
            <FormControl id="searchText"
                         name="searchText"
                         type="text"
                         placeholder="Search books"
                         defaultValue={searchText}/>
            <FormSelect id="searchType"
                        name="searchType"
                        style={{maxWidth: '150px'}}
                        defaultValue={searchType}>
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="isbn">ISBN</option>
            </FormSelect>
            <Button type="submit">
                <span className="bi bi-search"></span>
            </Button>
        </InputGroup>
    </Form>
);

export default BookSearchForm;