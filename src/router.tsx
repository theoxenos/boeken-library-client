import MainLayout from "./features/layouts/MainLayout.tsx";
import {booksViewRoute} from "./features/books/BooksView.tsx";
import RootErrorBoundary from "./ErrorELement.tsx";
import {authViewPageRoute} from "./features/auth/AuthView.tsx";
import {libraryPageRoute} from "./features/library/LibraryPage.tsx";
import LibraryPageDefaultDetailCard from "./features/library/components/LibraryPageDefaultDetailCard.tsx";
import {noteFormRoute} from "./features/library/components/LibraryBookNoteForm.tsx";
import {libraryBookDetailRoute} from "./features/library/components/LibraryBookDetail.tsx";
import {libraryBookNotesTableRoute} from "./features/library/components/LibraryBookNotesTable.tsx";
import {booksFormPageRoute} from "./features/books/BooksFormPage.tsx";
import RequireAuth from "./features/components/RequireAuth.tsx";
import {type RouteObject} from "react-router-dom";
import {loginFormRoute} from "./features/auth/components/LoginForm.tsx";
import {registerFormRoute} from "./features/auth/components/RegisterForm.tsx";

const router: RouteObject[] = [{
    path: '/',
    Component: MainLayout,
    ErrorBoundary: RootErrorBoundary,
    children: [
        {
            ...authViewPageRoute,
            children: [
                {
                    path: '/login',
                    ...loginFormRoute,
                },
                {
                    path: '/register',
                    ...registerFormRoute,
                },
            ]
        },
        {
            Component: RequireAuth,
            children: [
                {
                    index: true,
                    ...booksViewRoute,
                },
                {
                    path: '/library/books',
                    ...libraryPageRoute,
                    children: [
                        {
                            index: true,
                            Component: LibraryPageDefaultDetailCard
                        },
                        {
                            path: ':bookId',
                            ...libraryBookDetailRoute,
                            children: [
                                {
                                    index: true,
                                    ...libraryBookNotesTableRoute
                                },
                                {
                                    path: 'notes/new',
                                    ...noteFormRoute
                                },
                                {
                                    path: 'notes/:noteId/edit',
                                    ...noteFormRoute
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/books/new',
                    ...booksFormPageRoute
                },
                {
                    path: 'books/:bookId/edit',
                    ...booksFormPageRoute
                }
            ]
        }
    ]
}];

export default router;