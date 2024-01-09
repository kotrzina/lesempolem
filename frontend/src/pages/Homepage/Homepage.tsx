import {Button, Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import './Homepage.css';
import Address from "../../Address";
import {Photo} from "../../components/Photo/Photo";
import photo1 from './images/photo_1.jpg'
import photo2 from './images/photo_2.jpg'
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {FC} from "react";
import {LpDate} from "../../components/Date/LpDate";


export const HomepagePage: FC = () => {

    useDocumentTitle('Běžecké závody ve Veselici')

    const history = useHistory();

    function handleClickbait() {
        history.push(Address.registration)
    }

    return (
        <>
            <Row className={'d-lg-none'}>
                <Col xs={12}>
                    <h1>Běžecké závody LESEMPOLEM</h1>
                </Col>
                <Col xs={12}>
                    <p>
                        9. března proběhne ve Veselici, v lesích okolo rozhledny Podvrší a v jejím blízkém okolí,
                        9. ročník běžeckého závodu <strong>Lesempolem</strong>, jehož nultý ročník proběhl v červnu
                        2013. Tento rok budou závody přizpůsobeny blanenské okresní běžecké lize. Těšit se můžeš na
                        půlmaraton pro muže a čtvrtmaraton pro ženy a juniory.
                    </p>
                </Col>
                <Col xs={12}>
                    <p>
                        <Button variant={'success'} size={"lg"} onClick={() => handleClickbait()}>
                            REGISTRACE 2024
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
                <Button variant={"success"} size={'lg'} className={'btn-big'} onClick={() => handleClickbait()}>
                    REGISTRACE
                    <br/>
                    <LpDate type={"lp"} format={"short"}/>
                </Button>
            </Row>
        </>
    );
}
