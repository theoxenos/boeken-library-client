import {useState} from "react";

const useAuth = () => {
    const [token] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null);
    
    return token;
};

export default useAuth;