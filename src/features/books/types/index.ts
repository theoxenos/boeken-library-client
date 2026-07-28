interface IBaseBook {
    id: number;
    title: string;
    author: string;
    publishedYear?: number;
    isbn10?: string;
    isbn13?: string;
    coverUrl?: string;
    isInLibrary: boolean;
}

export interface IBook extends IBaseBook {
    createdAt: Date;
    updatedAt: Date;
}

export interface IBookResponse extends IBaseBook {
    createdAt: string;
    updatedAt: string;
}