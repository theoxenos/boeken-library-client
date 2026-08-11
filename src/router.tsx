import MainLayout from "./features/layouts/MainLayout.tsx";
import {booksViewRoute} from "./features/books/loaders/booksViewRoute.tsx";
import RootErrorBoundary from "./ErrorELement.tsx";
import AuthView from "./features/auth/AuthView.tsx";
import libraryPageRoute from "./features/library/loaders/libraryPageRoute.tsx";
import booksFormPageRoute from "./features/books/loaders/booksFormPageRoute.tsx";

const router = [{
    path: '/',
    element: <MainLayout/>,
    ErrorBoundary: RootErrorBoundary,
    children: [{
        path: '/',
        ...booksViewRoute,
    }, {
        path: '/login',
        element: <AuthView/>
    }, {
        path: '/register',
        element: <AuthView/>
    }, {
        path: '/library/books?/:bookId?',
        ...libraryPageRoute
    }, {
        path: '/books/new',
        ...booksFormPageRoute
    }]
}];

export default router;