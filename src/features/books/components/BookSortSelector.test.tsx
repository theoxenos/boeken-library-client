import {render, screen} from "@testing-library/react";
import {createStub} from "../../../test-utils/createStub.ts";
import BookSortSelector from "./BookSortSelector.tsx";
import userEvent from "@testing-library/user-event/dist/cjs/index.js";
import {MemoryRouter, useSearchParams} from "react-router-dom";
import {useEffect} from "react";

// Helper component that renders the current search string so we can assert on it
const SearchParamsDisplay = () => {
    const [searchParams] = useSearchParams();
    return <div data-testid="search-params">{searchParams.toString()}</div>;
};

const TestComponent = () => (
    <>
        <BookSortSelector/>
        <SearchParamsDisplay/>
    </>
);

it('should set the proper search params', async () => {
    const Stub = createStub({component: TestComponent});
    render(<Stub/>);

    const sortBy = screen.getByTestId('sortBy');

    const user = userEvent.setup();
    await user.selectOptions(sortBy, 'author');

    expect(sortBy).toHaveValue('author');
    expect(screen.getByTestId('search-params').textContent).toContain('sortBy=author');
});

const TestComponentWithUrl = ({searchParams}: { searchParams: URLSearchParams }) => {
    const [, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams(searchParams);
    }, [searchParams]);

    return <BookSortSelector/>;
}

it('should set the values based on the url', async () => {
    render(
        <MemoryRouter>
            <TestComponentWithUrl searchParams={new URLSearchParams('sortBy=author&sortOrder=desc')}/>
        </MemoryRouter>
    )

    const sortBy = screen.getByTestId('sortBy');
    const sortOrder = screen.getByTestId('sortOrder');

    expect(sortBy).toHaveValue('author');
    expect(sortOrder).toHaveValue('desc');
});