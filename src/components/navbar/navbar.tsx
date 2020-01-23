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
    NavbarText,
    Button
} from 'reactstrap';
import './navbar.css'
import GetAppIcon from '@material-ui/icons/GetApp';

interface Props {
    changePage: () => void
}

const NavBar: React.FC<Props> = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { changePage } = props;
    return (
        <div>
            <Navbar color="success" expand="md" scrolling dark fixed="top">
                <div className="wingspan-brand-container">
                    <NavbarBrand className="tree"></NavbarBrand>
                    <NavbarBrand className="wingspan-brand-name">WingSpan</NavbarBrand>
                    <div className="search-container">
                        <NavLink href="/" className="search-link" >
                            <SearchIcon className="navbar-search" fontSize="inherit" color="inherit" />
                        </NavLink>
                    </div>
                </div>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/about/" className="navbar-link" active={window.location.href.includes('about')}>About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/research/" className="navbar-link" active={window.location.href.includes('research')}>Research</NavLink>
                        </NavItem>
                        <Button color="success"><a href="http://www.google.com" className="whiteText-collapse" target="_blank">Download<GetAppIcon /></a></Button>
                    </Nav>
                </Collapse>
                <div className="right-side-navbar-container">
                    <NavLink href="/" className="search-link">
                        <SearchIcon onClick={changePage} className="navbar-search" fontSize="inherit" color="inherit" />
                    </NavLink>
                    <Button color="success"><a href="http://www.google.com" className="whiteText" target="_blank">Download<GetAppIcon /></a></Button>
                </div>
            </Navbar>
        </div>
    );
}

export default NavBar;