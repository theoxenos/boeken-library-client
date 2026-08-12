export interface ILibraryBook {
    bookId: number;
    title: string;
    author: string;
    publishedYear?: number;
    isbn10?: string;
    isbn13?: string;
    coverUrl?: string;
    status: string;
}

export interface IBaseNote {
    id: number;
    bookId: number;
    title: string;
    content: string;
}

export interface IBookNote extends IBaseNote {
    createdAt: Date;
    updatedAt: Date;
}

export interface IBookNoteResponse extends IBaseNote {
    createdAt: string;
    updatedAt: string;
}