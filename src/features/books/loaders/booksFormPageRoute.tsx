import BooksFormPage from "../BooksFormPage.tsx";
import {type LoaderFunctionArgs, redirect} from "react-router-dom";
import booksService from "../services/booksService.ts";

const bookFormPageAction = async ({request}: LoaderFunctionArgs) => {
    const formData = await request.formData();
    const { isbn, title, author, publishedYear, coverUrl } = Object.fromEntries(formData) as Record<string, string>;
    if(!author)
        return {errors: {author: true}};

    if(!title)
        return {errors: {title: true}};

    await booksService.createBook({
        title,
        author,
        coverUrl: coverUrl || undefined,
        isbn10: isbn.length === 10 ? isbn : undefined,
        isbn13: isbn.length === 13 ? isbn : undefined,
        publishedYear: publishedYear ? Number(publishedYear) : undefined
    }, request.signal);

    return redirect('/');
};

const booksFormPageRoute = {
    element: <BooksFormPage />,
    action: bookFormPageAction,
};

export default booksFormPageRoute;