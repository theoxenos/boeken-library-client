import {Placeholder} from "react-bootstrap";

const LibraryBookNotesTableSkeleton = () => {
    return (
        <>
            {Array.from({length: 5}).map((_, index) => (
                <tr key={index}>
                    <td>
                        <Placeholder xs={6}/>
                    </td>
                    <td>
                        <Placeholder xs={4}/>
                    </td>
                    <td>
                        <Placeholder xs={4}/>
                    </td>
                    <td>
                        <Placeholder.Button size="sm" xs={2} className="me-1 btn-sm"/>
                        <Placeholder.Button size="sm" variant="danger" xs={2} className="btn-sm"/>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default LibraryBookNotesTableSkeleton;