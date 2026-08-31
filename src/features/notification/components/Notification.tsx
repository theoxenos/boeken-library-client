import {Alert} from "react-bootstrap";
import useNotification from "../hooks/useNotification.tsx";

const Notification = () => {
    const {message, variant} = useNotification();

    if (!message)
        return null;

    return (
        <Alert variant={variant}>
            {message}
        </Alert>
    );
};

export default Notification;