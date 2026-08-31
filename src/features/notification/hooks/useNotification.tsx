import {useContext} from "react";
import {NotificationContext, type NotificationContextType} from "../context/NotificationContextProvider.tsx";

const useNotification = () => {
    const context = useContext(NotificationContext) as NotificationContextType;

    if (!context) throw new Error("useNotification must be used within a NotificationContextProvider");

    return context;
};

export default useNotification;