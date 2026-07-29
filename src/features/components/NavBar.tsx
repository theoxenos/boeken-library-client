import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import useUserContext from "../auth/hooks/useUserContext.tsx";

const NavBar = () => {
    const {user, setUser} = useUserContext();

    return (
        <Navbar expand="sm" className="bg-body-tertiary mb-3 p-3">
            <Navbar.Brand href="/">BOEKMaatwerk</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {user ? (
                        <>
                            <NavDropdown title="Books" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/books/add">Add book</NavDropdown.Item>
                                {/*<NavDropdown.Item href="/books/notes">View all notes</NavDropdown.Item>*/}
                            </NavDropdown>
                            <NavDropdown title={user?.name} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/library">My Library</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => setUser(null)}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                        <Nav.Link href="/login">Log In</Nav.Link>
                    )}
                    {/*<SplitButton*/}
                    {/*    id="dropdown-split-basic"*/}
                    {/*    drop="down"*/}
                    {/*    title="Actions"*/}
                    {/*    variant="light"*/}
                    {/*    className="ms-auto"*/}
                    {/*>*/}
                    {/*    <NavDropdown.Item href="#/action-1">Action</NavDropdown.Item>*/}
                    {/*    <NavDropdown.Item href="#/action-2">Another action</NavDropdown.Item>*/}
                    {/*    <NavDropdown.Item href="#/action-3">Something else</NavDropdown.Item>*/}
                    {/*    <Dropdown.Divider />*/}
                    {/*    <NavDropdown.Item href="#/action-4">Separated link</NavDropdown.Item>*/}
                    {/*</SplitButton>*/}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;