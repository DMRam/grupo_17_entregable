import React, { useState } from 'react';
import { Modal, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../hooks/useAuthentication';
import './Navbar.css'; // Import your CSS file for styling


interface Props {
    name: string
}
declare global {
    interface Window {
        google: any;
    }
}
export const ImmNavbar = ({ name }: Props) => {
    const navigate = useNavigate()
    const { onUserLoggingOut, isUserLoggedOut } = useAuthentication()
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => setShowMenu(!showMenu);
    const handleClose = () => setShowMenu(false);

    const clearGoogleCookies = () => {
        const cookies = document.cookie.split("; ");
        for (const cookie of cookies) {
            const [name] = cookie.split("=");
            if (name.startsWith("G_AUTHUSER_")) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
            }
        }
    }

    // logout
    // const onLogout = () => {
    //     console.log("Sign out clicked");
    //     const email = localStorage.getItem('email');

    //     // Clear specific items related to authentication
    //     localStorage.removeItem('token'); // Assuming 'token' is the authentication token key
    //     localStorage.removeItem('email'); // Assuming 'user' is the user information key

    //     // Remove the current page from session history and navigate to login
    //     window.history.replaceState(null, '', '/');
    //     navigate('/', { replace: true });

    //     // Reload the page to reflect the logged-out state
    //     window.location.reload();

    //     // Revoke access using Google API
    //     if (email) {
    //         window.google.accounts.id.revoke(email, (done: any) => {
    //             console.log("Google account revoked");
    //         });
    //     }

    //     // Make this true
    //     if (!isUserLoggedOut) {
    //         onUserLoggingOut();
    //     }

    // }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="#home"> {/* Change this to your hamburger icon */}
                <span onClick={toggleMenu}>&#9776;</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard/analytics">Analytics</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard/reports">Reports</Nav.Link>
                    <Nav.Link as={Link} to="/dashboard/settings">Settings</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <div className="navbar">
                <div className="user-info">
                    Usuario: <span className="user-name">{name}</span>
                </div>
                {/* Other navbar elements */}
            </div>
            {/* Render menu based on showMenu state */}
            <Modal show={showMenu} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Menu</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/dashboard">Home</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard/analytics">Analytics</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard/reports">Reports</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard/settings">Settings</Nav.Link>
                        {/* <Nav.Link onClick={onLogout} href="/">Logout</Nav.Link> */}
                    </Nav>
                </Modal.Body>
                {/* You can add additional modal footer if needed */}
            </Modal>
        </Navbar>
    );
};