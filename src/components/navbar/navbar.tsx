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

interface Props {
    changePage: () => void
}

const NavBar: React.FC<Props> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { changePage } = props;
    return (
        <div className="navbar-container">
            <Navbar color="success" expand="md" scrolling dark fixed="top">
                <div className="wingspan-brand-container">
                    <NavbarBrand className="tree"></NavbarBrand>
                    <NavbarBrand className="text-white wingspan-brand-name-mobile">WingSpan</NavbarBrand>
                    <div className="search-container">
                        <NavLink href="/" className="search-link">
                            <SearchIcon className="navbar-search" fontSize="inherit" color="inherit" />
                        </NavLink>
                    </div>
                </div>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/about/" className="text-white">about</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/research/" className="text-white">Research</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                <div className="right-side-navbar-container">
                    <NavLink href="/" className="search-link">
                        <SearchIcon onClick={changePage} className="navbar-search" fontSize="inherit" color="inherit" />
                    </NavLink>
                    <NavbarBrand className="wingspan-brand-name">WingSpan</NavbarBrand>
                </div>
            </Navbar>
        </div>
    );
}

export default NavBar;