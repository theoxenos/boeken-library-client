import {Outlet} from "react-router-dom";
import UserContextProvider from "../auth/context/UserContextProvider.tsx";
import {Container} from "react-bootstrap";

const MainLayout = () => {
    return (
        <UserContextProvider>
            <Container>
                <Outlet/>
            </Container>
        </UserContextProvider>
    );
};

export default MainLayout;