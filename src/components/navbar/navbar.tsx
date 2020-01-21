import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import './navbar.css'

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div className="navbar-container">
            <Navbar color="success" expand="md" scrolling dark fixed="top">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/product/" className="text-white">Product</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/about/" className="text-white">About</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                <NavbarBrand className="text-white">WingSpan</NavbarBrand>
            </Navbar>
        </div>
    );
}

export default NavBar;