import {Outlet} from "react-router-dom";
import UserContextProvider from "../auth/context/UserContextProvider.tsx";
import {Container} from "react-bootstrap";
import NavBar from "../components/NavBar.tsx";

const MainLayout = () => {
    return (
        <UserContextProvider>
            <NavBar/>
            <Container>
                <Outlet/>
            </Container>
        </UserContextProvider>
    );
};

export default MainLayout;