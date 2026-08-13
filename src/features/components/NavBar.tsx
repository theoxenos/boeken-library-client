import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import useUserContext from "../auth/hooks/useUserContext.tsx";
import BookSearchForm from "../components/BookSearchForm.tsx";
import {useSearchParams} from "react-router-dom";

const NavBar = () => {
    const {user, setUser} = useUserContext();
    const [searchParams] = useSearchParams();
    const {searchText = '', searchType = 'title'} = Object.fromEntries(searchParams);

    return (
        <Navbar expand="sm" className="bg-body-tertiary mb-3 p-3">
            <Navbar.Brand href="/">BOEKMaatwerk</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    {user ? (
                        <>
                            <NavDropdown title="Books" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/books/new">Add book</NavDropdown.Item>
                                {/*<NavDropdown.Item href="/books/notes">View all notes</NavDropdown.Item>*/}
                            </NavDropdown>
                            <NavDropdown title={user?.name} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/library/books">My Library</NavDropdown.Item>
                                <NavDropdown.Item href="/login" onClick={() => setUser(null)}>Log Out</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    ) : (
                        <Nav.Link href="/login">Log In</Nav.Link>
                    )}
                </Nav>
                {user && <BookSearchForm key={searchText} searchText={searchText} searchType={searchType}/>}
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavBar;