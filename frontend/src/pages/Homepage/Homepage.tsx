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
        navigate(Address.results2024)
    }

    return (
        <>
            <Row className={'d-lg-none'}>
                <Col xs={12}>
                    <h1>Běžecké závody LESEMPOLEM</h1>
                </Col>
                <Col xs={12}>
                    <p>
                        9. března proběhnul ve Veselici, v lesích okolo rozhledny Podvrší a v jejím blízkém okolí,
                        11. ročník běžeckého závodu <strong>Lesempolem</strong>, jehož nultý ročník proběhl v červnu
                        2013. Tento rok byly závody přizpůsobeny blanenské okresní běžecké lize.
                    </p>
                </Col>
                <Col xs={12}>
                    <p>
                        <Button
                            variant={'success'}
                            size={"lg"}
                            onClick={() => handleClickbait()}>
                            Výsledky Lesempolem 2024
                        </Button>
                        <br/>
                        <Button
                            variant={"success"}
                            size={'lg'}
                            href={Address.results2024Borak}
                            className={"mt-2"}>
                            Výsledky BORÁK 2024
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
                    LESEMPOLEM 2024
                </Button>
                <br/>
                <Button variant={"success"} size={'lg'} className={'btn-big'} href={Address.results2024Borak}>
                    BORÁK 2024
                </Button>
            </Row>
        </>
    );
}
