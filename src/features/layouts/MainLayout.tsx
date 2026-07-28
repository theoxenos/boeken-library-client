import {Outlet} from "react-router-dom";
import UserContextProvider from "../auth/context/UserContextProvider.tsx";

const MainLayout = () => {
    return (
        <UserContextProvider>
            <div className="container-xxl vh-100">
                <Outlet/>
            </div>
        </UserContextProvider>
    );
};

export default MainLayout;