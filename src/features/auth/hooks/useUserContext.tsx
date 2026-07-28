import UserContext from "../context/UserContext.tsx";
import {useContext} from "react";

const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserContextProvider");
    }
    return context;
};

export default useUserContext;