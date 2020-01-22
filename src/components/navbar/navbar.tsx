import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
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
                <div className="wingspan-brand-container">
                    <NavbarBrand className="tree"></NavbarBrand>
                    <NavbarBrand className="text-white wingspan-brand-name-mobile">WingSpan</NavbarBrand>
                    <div className="search-container">
                        <SearchIcon className="navbar-search" fontSize="inherit" color="inherit" />
                    </div>
                </div>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem className="nav-item">
                            <NavLink href="/product/" className="text-white">Product</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/about/" className="text-white">About</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                <div className="right-side-navbar-container">
                    <SearchIcon className="navbar-search" fontSize="inherit" color="inherit" />
                    <NavbarBrand className="wingspan-brand-name">WingSpan</NavbarBrand>
                </div>
            </Navbar>
        </div>
    );
}

export default NavBar;