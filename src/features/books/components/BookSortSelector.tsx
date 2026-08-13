import {useSearchParams} from "react-router-dom";
import {FormSelect} from "react-bootstrap";
import type {ChangeEvent} from "react";

const BookSortSelector = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get('sortBy') || 'title';
    const sortOrder = searchParams.get('sortOrder') || 'asc';

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newParams = new URLSearchParams(searchParams);
        const {name, value} = e.target;
        newParams.set(name, value);
        setSearchParams(newParams);
    };

    return (
        <div className="d-flex gap-2 ms-2">
            <FormSelect id="sortBy"
                        name="sortBy"
                        className="w-auto"
                        value={sortBy}
                        onChange={handleSortChange}>
                <option value="title">Sort by Title</option>
                <option value="author">Sort by Author</option>
                <option value="publishedYear">Sort by Year</option>
                <option value="averageRating">Sort by Rating</option>
            </FormSelect>
            <FormSelect id="sortOrder"
                        name="sortOrder"
                        className="w-auto"
                        value={sortOrder}
                        onChange={handleSortChange}>
                <option value="asc">ASC</option>
                <option value="desc">DESC</option>
            </FormSelect>
        </div>
    );
};

export default BookSortSelector;
