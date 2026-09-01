import {render, screen, waitFor} from "@testing-library/react";
import {booksFormPageRoute} from "./BooksFormPage.tsx";
import userEvent from "@testing-library/user-event";
import booksService from "./services/booksService.ts";
import {createStub} from "../../test-utils/createStub.ts";

const HydrateFallBackElement = () => <></>;

vi.mock('./services/booksService.ts', () => ({
    default: {
        getBookByIsbn: vi.fn(),
        getBookById: vi.fn(),
        createBook: vi.fn(),
        updateBook: vi.fn(),
        getAllBooks: vi.fn(),
    }
}));

it('should render', async () => {
    const loader = () => ({bookPromise: Promise.resolve(null)});
    const Stub = createStub({component: booksFormPageRoute.Component, hydrateFallback: HydrateFallBackElement, loader});
    render(<Stub/>);
    expect(await screen.findByText('Add book')).toBeInTheDocument();
});

describe('with book data', () => {
    const loader = () => ({bookPromise: Promise.resolve({title: 'Test book'})});

    it('should display "Edit book"', async () => {
        const Stub = createStub({
            component: booksFormPageRoute.Component,
            hydrateFallback: HydrateFallBackElement,
            loader
        });
        render(<Stub/>);
        await waitFor(() => screen.getByText('Edit book'));
    });

    it('should display Save button', async () => {
        const Stub = createStub({
            component: booksFormPageRoute.Component,
            hydrateFallback: HydrateFallBackElement,
            loader
        });
        render(<Stub/>);
        await waitFor(() => screen.getByRole('button', {name: 'Save'}));
    });

    it('should fill the form with book data', async () => {
        const Stub = createStub({
            component: booksFormPageRoute.Component,
            hydrateFallback: HydrateFallBackElement,
            loader
        });
        render(<Stub/>);
        await waitFor(() => screen.getByDisplayValue('Test book'));
    });
});

describe('validation errors', () => {
    it('shows validation errors on submit when action returns errors', async () => {
        const action = () => ({title: true, author: true})
        const loader = () => ({bookPromise: Promise.resolve(null)});
        const Stub = createStub({
            component: booksFormPageRoute.Component,
            hydrateFallback: HydrateFallBackElement,
            loader,
            action
        });
        render(<Stub/>);

        const submitButton = await screen.findByRole('button', {name: 'Add'});

        const user = userEvent.setup();
        await user.click(submitButton);

        await waitFor(() => screen.getByText('Please enter a valid title.'));
        screen.getByText('Please enter a valid author.');
    });
});

describe('ISBN search', () => {
    const loader = () => ({bookPromise: Promise.resolve(null)});

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should populate fields after a successful ISBN search', async () => {
        vi.mocked(booksService.getBookByIsbn).mockResolvedValue({
            title: 'ISBN Book Title',
            author: 'ISBN Author',
            publishedYear: 2020,
            coverUrl: 'https://example.com/cover.jpg',
        });

        const Stub = createStub({
            component: booksFormPageRoute.Component,
            hydrateFallback: HydrateFallBackElement,
            loader
        });
        render(<Stub/>);

        const isbnInput = await screen.findByPlaceholderText('Enter ISBN');
        const searchButton = screen.getByRole('button', {name: 'Search'});

        const user = userEvent.setup();
        await user.type(isbnInput, '1234567890');
        await user.click(searchButton);

        await waitFor(() => {
            expect(screen.getByDisplayValue('ISBN Book Title')).toBeInTheDocument();
        });
        expect(screen.getByDisplayValue('ISBN Author')).toBeInTheDocument();
        expect(screen.getByDisplayValue('2020')).toBeInTheDocument();
        expect(booksService.getBookByIsbn).toHaveBeenCalledWith('1234567890');
    });

    it('should call getBookByIsbn with the entered ISBN value', async () => {
        vi.mocked(booksService.getBookByIsbn).mockResolvedValue({
            title: 'Any Book',
            author: 'Any Author',
            publishedYear: 2000,
            coverUrl: '',
        });

        const Stub = createStub({
            component: booksFormPageRoute.Component,
            hydrateFallback: HydrateFallBackElement,
            loader
        });
        render(<Stub/>);

        const isbnInput = await screen.findByPlaceholderText('Enter ISBN');
        const searchButton = screen.getByRole('button', {name: 'Search'});

        const user = userEvent.setup();
        await user.type(isbnInput, '9781234567897');
        await user.click(searchButton);

        await waitFor(() => {
            expect(booksService.getBookByIsbn).toHaveBeenCalledTimes(1);
            expect(booksService.getBookByIsbn).toHaveBeenCalledWith('9781234567897');
        });
    });
});