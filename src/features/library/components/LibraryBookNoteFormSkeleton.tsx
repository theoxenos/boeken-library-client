import {Spinner} from "react-bootstrap";

const LibraryBookNoteFormSkeleton = ({isEdit}: { isEdit: boolean }) => {

    return (
        <>
            <h4 className="mb-3">{isEdit ? "Edit Note" : "Add Note"}</h4>
            <div className="d-flex justify-content-center align-items-center" style={{minHeight: "300px"}}>
                <Spinner/>
            </div>
        </>
    );
};

export default LibraryBookNoteFormSkeleton;