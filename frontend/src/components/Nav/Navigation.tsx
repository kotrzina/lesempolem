import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import './Navigation.css';
import Address from '../../Address'


interface NavBarProps {
}

export const NavBar: React.FC<NavBarProps> = (props: NavBarProps) => (
    <div id={'nav'} className={'all-Nav'}>
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <NavItem url={Address.homepage} title={'Lesempolem'}/>
                        <NavItem url={Address.registration} title={'Registrace 2022'}/>
                        <NavItem url={Address.info} title={'Informace'}/>
                        <NavItem url={Address.results} title={'Výsledky'}/>
                        <NavItem url={Address.video} title={'Video'}/>
                        <NavItem url={Address.track} title={'Trať'}/>
                        <NavItem url={Address.contacts} title={'Kontakty'}/>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
);

interface NavItemProps {
    url: string;
    title: string;
}

export const NavItem: React.FC<NavItemProps> = (props) => (
    <NavLink activeClassName={'selected'} exact={true} to={props.url}>{props.title}</NavLink>
);
