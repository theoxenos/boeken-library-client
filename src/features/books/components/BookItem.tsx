import type {IBook} from "../types";

const BookItem = ({book}: { book: IBook }) => {
    return (
        <div className="row row-cols-2 row-cols-md-1 g-2">
            <div className="col">
                <img
                    src={book.coverUrl?.replace('L', 'M')}
                    alt={`Cover of ${book.title}`}
                    // className="card-img"
                    className=""
                    style={{width: '180px', height: '290px', objectFit: 'cover'}}
                />
            </div>
            <div className="col">
                <div className="fw-bold">{book.title}</div>
                <div className="text-muted">{book.author}</div>
                <div className="text-secondary">{book.publishedYear}</div>
            </div>
            <div className="d-flex flex-row justify-content-between">
                <div>
                    4/5
                </div>
                {/*<div>*/}
                {/*    12*/}
                {/*</div>*/}
                <div>
                    Add to list
                </div>
            </div>
        </div>
    );
};

export default BookItem;