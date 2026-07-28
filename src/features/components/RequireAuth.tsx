import {type ReactNode} from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import useUserContext from "../auth/hooks/useUserContext.tsx";

const RequireAuth = ({children}: { children?: ReactNode }) => {
    const location = useLocation();
    const {user} = useUserContext();

    if (!user) {
        return <Navigate to="/login" state={{from: location.pathname}} />;
    }

    return children ? children : <Outlet/>;
};

export default RequireAuth;