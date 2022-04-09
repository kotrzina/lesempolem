import {FC, useState} from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import './Navigation.css';
import Address from '../../Address'

export const NavBar: FC = () => {

    const [expanded, setExpanded] = useState(false);

    function collapseNav(): void {
        setExpanded(false)
    }

    return (
        <div id={'nav'} className={'all-Nav'}>
            <Navbar bg="light" expand="lg" expanded={expanded}>
                <Container className={"smol"}>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavItem clicked={collapseNav} url={Address.homepage} title={'Lesempolem'}/>
                            <NavItem clicked={collapseNav} url={Address.registration} title={'Registrace'}/>
                            <NavItem clicked={collapseNav} url={Address.info} title={'Informace'}/>
                            <NavItem clicked={collapseNav} url={Address.results} title={'Výsledky'}/>
                            <NavItem clicked={collapseNav} url={Address.video} title={'Video'}/>
                            <NavItem clicked={collapseNav} url={Address.track} title={'Trať'}/>
                            <NavItem clicked={collapseNav} url={Address.contacts} title={'Kontakty'}/>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
};

interface NavItemProps {
    url: string;
    title: string;
    clicked: () => void;
}

export const NavItem: React.FC<NavItemProps> = (props) => (
    <NavLink onClick={() => props.clicked()} activeClassName={'selected'} exact={true}
             to={props.url}>{props.title}</NavLink>
);
