import React from "react";
import './Footer.css'
import {Container, Row} from "react-bootstrap";
import AutoservisSkoumalImage from './sponsorImages/ruda_skoumal.png'
import TridoImage from './sponsorImages/trido.png'
import KolaNovakImage from './sponsorImages/kola_novak.png'
import CSystemImage from './sponsorImages/csystem.png'
import CernaHoraImage from './sponsorImages/cernahora.png'
import KotrzinaImage from './sponsorImages/kotrzina-logo.png'

interface Props {

};

export const Footer: React.FC<Props> = (props) => (
    <div id={'sponsors'}>
        <Container>
            <Row md={12} className={'list'}>
                <Sponsor
                    name={'Autoservis Blansko, Rudolf Skoumal'}
                    link={'tel:+420728829500'}
                    image={AutoservisSkoumalImage}
                />
                <Sponsor
                    name={'Společenství přátel Kotržiny'}
                    link={'#'}
                    image={KotrzinaImage}
                />
                <Sponsor
                    name={'Trido - Profesionální garážová vrata'}
                    link={'https://www.trido.cz/'}
                    image={TridoImage}
                />
                <Sponsor
                    name={'Vše pro cyklistiku a outdoor'}
                    link={'https://kolanovak.cz/'}
                    image={KolaNovakImage}
                />
                <Sponsor
                    name={'Csystem'}
                    link={'https://www.csystem.cz/'}
                    image={CSystemImage}
                />
                <Sponsor
                    name={'Pivovar Černá Hora'}
                    link={'http://www.pivovarcernahora.cz/'}
                    image={CernaHoraImage}
                />
            </Row>
        </Container>
    </div>
);

interface SponsorProps {
    name: string;
    link: string;
    image: string;
};

const Sponsor: React.FC<SponsorProps> = (props) => (
    <a rel="noreferrer" target={'_blank'} href={props.link}>
        <img src={props.image} alt={props.name}/>
    </a>
);
