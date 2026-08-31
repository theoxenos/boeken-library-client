import {createContext, type ReactNode, useRef, useState} from "react";
import {type Variant} from "react-bootstrap/types";

export type NotificationContextType = {
    message: string;
    variant: Variant;
    setNotification: (message: string, variant?: Variant, duration?: number) => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(null);

const NotificationContextProvider = ({children}: { children: ReactNode }) => {
    const [message, setMessage] = useState<string>('');
    const [variant, setVariant] = useState<Variant>('success');

    const timeoutRef = useRef<number | null>(null);

    const setNotification = (message: string, variant: Variant = 'success', duration: number = 3000) => {
        setMessage(message);
        setVariant(variant);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setMessage('');
        }, duration);
    };

    return (
        <NotificationContext value={{message, variant, setNotification}}>
            {children}
        </NotificationContext>
    );
};

export default NotificationContextProvider;