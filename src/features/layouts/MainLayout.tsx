import {Outlet} from "react-router-dom";
import UserContextProvider from "../auth/context/UserContextProvider.tsx";
import {Container} from "react-bootstrap";
import NavBar from "../components/NavBar.tsx";
import NotificationContextProvider from "../notification/context/NotificationContextProvider.tsx";
import Notification from "../notification/components/Notification.tsx";

const MainLayout = () => {
    return (
        <UserContextProvider>
            <NotificationContextProvider>
                <NavBar/>
                <Container>
                    <Notification/>
                    <Outlet/>
                </Container>
            </NotificationContextProvider>
        </UserContextProvider>
    );
};

export default MainLayout;