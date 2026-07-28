export interface IBook {
    id: number;
    title: string;
    author: string;
    publishedYear?: number;
    isbn10?: string;
    isbn13?: string;
    coverUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBookResponse {
    id: number;
    title: string;
    author: string;
    publishedYear?: number;
    isbn10?: string;
    isbn13?: string;
    coverUrl?: string;
    createdAt: string;
    updatedAt: string;
}