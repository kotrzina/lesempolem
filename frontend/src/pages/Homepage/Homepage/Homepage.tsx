import React from "react";
import {Button, Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import './Homepage.css';
import Address from "../../../Address";
import {Photo} from "../../../components/Photo/Photo";
import photo1 from './images/photo_1.jpg'
import photo2 from './images/photo_2.jpg'
import {useDocumentTitle} from "../../../hooks/useDocumentTitle";


export const HomepagePage: React.FC = () => {

    useDocumentTitle('Lesempolem - běžecké závody ve Veselici')

    const history = useHistory();

    function handleResultsClick() {
        history.push(Address.results2021)
    }

    return (
        <>
            <Row className={'d-lg-none'}>
                <Col xs={12}>
                    <h1>Běžecké závody LESEMPOLEM</h1>
                </Col>
                <Col xs={12}>
                    <p>
                        12. června 2021 proběhne ve Veselici, v lesích okolo rozhledny Podvrší a v jejím blízkém okolí,
                        7.
                        ročník
                        běžeckého závodu "Lesempolem", jehož nultý ročník proběhl v červnu 2013. Tento rok budou závody
                        v
                        ultramaratonském duchu. Pokud si na 62 km dlouho trať netroufneš, můžeš zkusit i něco kratšího.
                        Bližší
                        informace a registrace jsou v přípravách.
                    </p>
                </Col>
                <Col xs={12}>
                    <p>
                        <Button variant={'success'} onClick={() => handleResultsClick()}>
                            Výsledky LESEMPOLEM 2021
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
                <Button variant={"success"} size={'lg'} className={'btn-big'} onClick={() => handleResultsClick()}>
                    &nbsp;MČR v ultramaratonu 2021&nbsp;
                    <br/>
                    Výsledky
                </Button>
            </Row>
        </>
    );
}
