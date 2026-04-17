import './Footer.css'
import {Container, Row} from "react-bootstrap";
import AutoservisSkoumalImage from './sponsorImages/ruda_skoumal.png'
import TridoImage from './sponsorImages/trido.png'
import KolaNovakImage from './sponsorImages/kola_novak.png'
import KotrzinaImage from './sponsorImages/kotrzina-logo.png'
import DobryDost from './sponsorImages/dobrydost.webp'
import LesyCrImage from './sponsorImages/lesy_cr.jpg'
import {FC} from "react";

export const Footer: FC = () => (
    <div id={'sponsors'}>
        <Container>
            <Row className={'partner'}>
                <div className={'partner-body'}>
                    <a rel="noreferrer" target={'_blank'} href={'https://lesycr.cz/'}>
                        <img src={LesyCrImage} alt={'Lesy České republiky, s. p.'}/>
                    </a>
                    <p>Konání akce umožnil podnik Lesy České republiky, s.&nbsp;p. Závod se koná na území, které spravuje státní podnik Lesy České republiky – jsou to i Vaše lesy, chovejme se tady ohleduplně.</p>
                </div>
            </Row>
            <Row md={12} className={'list'}>
                <Sponsor
                    name={'Dobrý Dost - Poctivý Jerky z Krasu'}
                    link={'https://www.dobrydost.cz/'}
                    image={DobryDost}
                />
                <Sponsor
                    name={'Vše pro cyklistiku a outdoor'}
                    link={'https://kolanovak.cz/'}
                    image={KolaNovakImage}
                />
                <Sponsor
                    name={'Autoservis Blansko, Rudolf Skoumal'}
                    link={'tel:+420728829500'}
                    image={AutoservisSkoumalImage}
                />
                <Sponsor
                    name={'Trido - Profesionální garážová vrata'}
                    link={'https://www.trido.cz/'}
                    image={TridoImage}
                />
                <Sponsor
                    name={'Společenství přátel Kotržiny'}
                    link={'#'}
                    image={KotrzinaImage}
                />
            </Row>
        </Container>
    </div>
);

interface SponsorProps {
    name: string;
    link: string;
    image: string;
}

const Sponsor: React.FC<SponsorProps> = (props) => (
    <a rel="noreferrer" target={'_blank'} href={props.link}>
        <img src={props.image} alt={props.name}/>
    </a>
);
