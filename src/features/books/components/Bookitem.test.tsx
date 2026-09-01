import {render, screen} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import BookItem from './BookItem.tsx';
import userEvent from '@testing-library/user-event'
import type {IBook} from "../types";

const createTestBook = (overrides = {}) => ({
    id: 1,
    title: 'Test Book Title',
    author: 'Test Author',
    createdAt: new Date('2026-08-01'),
    updatedAt: new Date('2026-08-01'),
    averageRating: 4.5,
    rating: 5,
    status: null!,
    ...overrides,
});

const renderBook = (
    book: IBook,
    onRemoveFromLibrary = (_bookId: number) => {
    },
    onAddToLibrary = (_bookId: number) => {
    },
    onSetRating = (_bookId: number, _rating: number) => {
    }
) => {
    render(
        <MemoryRouter>
            <BookItem
                book={book}
                onRemoveFromLibrary={onRemoveFromLibrary}
                onAddToLibrary={onAddToLibrary}
                onSetRating={onSetRating}
            />
        </MemoryRouter>
    );
};

describe('component should render the book', () => {
    test('BookItem renders correctly', () => {
        renderBook(createTestBook({publishedYear: 2026}));
        expect(screen.getByText('Test Book Title')).toBeDefined();
        expect(screen.getByText('Test Author')).toBeDefined();
        expect(screen.getByText('2026')).toBeDefined();
    });

    test('average rating renders correctly with average rating', () => {
        renderBook(createTestBook());
        expect(screen.getByText('4.5 / 5')).toBeDefined();
    });

    test('average rating does not render without average rating', () => {
        renderBook(createTestBook({averageRating: null}));
        expect(screen.queryByText('/ 5')).toBeNull();
    });

    test('positive published year displays year without BC', () => {
        renderBook(createTestBook({publishedYear: 2026}));
        expect(screen.getByText('2026')).toBeDefined();
    });

    test('negative published year displays as year BC', () => {
        renderBook(createTestBook({publishedYear: -2026}));
        expect(screen.getByText('2026 BC')).toBeDefined();
    });

    test('no published years does not display any year', () => {
        renderBook(createTestBook({publishedYear: null}));
        const publishedYearDiv = screen
            .getByText('Test Book Title').parentElement?.querySelector('.text-secondary');
        expect(publishedYearDiv?.textContent).toBe('');
    });
});

describe('event handlers should work', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('clicking remove button should call event handler once and pass proper arguments', async () => {
        const mockHandler = vi.fn();
        renderBook(createTestBook({status: 'to-read'}), mockHandler);

        const user = userEvent.setup()
        const removeButton = screen.getByRole('button', {name: 'Remove from library'});
        await user.click(removeButton);
        expect(mockHandler).toHaveBeenCalledTimes(1);
        const bookId = 1;
        expect(mockHandler).toHaveBeenNthCalledWith(1, bookId);
    });

    test('clicking add button should call event handler once and pass proper arguments', async () => {
        const mockHandler = vi.fn();
        renderBook(createTestBook(), undefined, mockHandler);

        const user = userEvent.setup()
        const addButton = screen.getByRole('button', {name: 'Add to library'});
        await user.click(addButton);
        expect(mockHandler).toHaveBeenCalledTimes(1);
        const bookId = 1;
        expect(mockHandler).toHaveBeenNthCalledWith(1, bookId);
    });

    test('clicking a star should call event handler once and pass proper arguments', async () => {
        const mockHandler = vi.fn();
        renderBook(createTestBook(), undefined, undefined, mockHandler);

        const user = userEvent.setup()
        const starButton = document.querySelector('.bi');
        expect(starButton).not.toBeNull();
        await user.click(starButton!);
        expect(mockHandler).toHaveBeenCalledTimes(1);
        const bookId = 1;
        const rating = 1;
        expect(mockHandler).toHaveBeenNthCalledWith(1, bookId, rating);
    });
});