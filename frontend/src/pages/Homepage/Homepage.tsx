import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import './Homepage.css';
import Address from "../../Address";
import {Photo} from "../../components/Photo/Photo";
import photo1 from './images/photo_1.jpg'
import photo2 from './images/photo_2.jpg'
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {FC} from "react";


export const HomepagePage: FC = () => {

    useDocumentTitle('Běžecké závody ve Veselici')

    const navigate = useNavigate();

    function handleClickbait() {
        const url = "https://www.oblblansko.cz/index.php?page=vysledky&navrat=terminovka&rok_vyber=2025&termin_vyber=289"
        //@ts-ignore
        window.open(url, '_blank').focus();
    }

    return (
        <>
            <Row className={'d-lg-none'}>
                <Col xs={12}>

                </Col>
                <Col xs={12}>
                    <h1 style={{padding: 0}}>Běžecké závody LESEMPOLEM</h1>

                    <p>
                        Lesempolem je jedinečný běžecký závod, který se každoročně koná v malebném prostředí obce
                        Veselice v Jihomoravském kraji. Trať závodu vede převážně lesními a polními cestami v okolí
                        rozhledny Podvrší, což nabízí nádherné výhledy a zážitek z běhu v přírodě. Závod je určen pro
                        široké spektrum běžců – od amatérů až po zkušené závodníky – a nabízí různé délky tras, včetně 10
                        km, maratonu a ultramaratonu. Díky různorodosti tratí si zde každý najde
                        výzvu odpovídající své kondici.

                        Závod je součástí Okresní běžecké ligy Blansko.
                        Start a cíl se nachází ve sportovním areálu ve Veselici, kde na
                        běžce i jejich doprovod čeká bohatý program, občerstvení a přátelská atmosféra. Ať už jste
                        zkušený běžec, nebo si chcete užít pohyb v přírodě, Lesempolem je akcí, na kterou budete rádi
                        vzpomínat.

                        Pokud potřebujete další informace o nadcházejícím ročníku, sledujte naše oficiální stránky.
                        Těšíme se na vás na startovní čáře!
                    </p>
                </Col>
                <Col xs={12}>
                <p>
                        <Button
                            variant={'success'}
                            size={"lg"}
                            onClick={() => handleClickbait()}>
                            Lesempolem výsledky
                        </Button>
                    </p>
                </Col>

                <Col xs={12}>
                    <h2>Fotky ze závodu:</h2>
                </Col>

                <Col xs={6}>
                    <Photo src={photo1}/>
                </Col>

                <Col xs={6}>
                    <Photo src={photo2}/>
                </Col>
            </Row>

            <Row id={'bb'} className={'d-none d-sm-none d-md-none d-lg-block'}>
                <Button variant={"success"} size={'lg'} className={'btn-big mb-3'} onClick={() => handleClickbait()}>
                    LESEMPOLEM<br/>
                    VÝSLEDKY
                </Button>
            </Row>
        </>
    );
}
