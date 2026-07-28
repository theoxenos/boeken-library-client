import {
    type ReactNode,
    useEffect
} from "react";
import type {TUserLoginResponse} from "../types";
import UserContext from "./UserContext";
import useLocalStorage from "../../hooks/useLocalStorage.tsx";

const UserContextProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useLocalStorage<TUserLoginResponse | null>("user", null);

    useEffect(() => {
        if (!user) {
            localStorage.clear();
            return;
        }

        setUser(user);
    }, [setUser, user]);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
