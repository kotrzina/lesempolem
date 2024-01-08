import {Button, Col, Row} from "react-bootstrap";
import text from './texts.json'
import {CategoryTable} from "./CategoryTable/CategoryTable";
import {List} from "./List/List";
import {useHistory} from "react-router-dom";
import Address from "../../Address";
import './Info.css'
import {StartingFee} from "./StartingFee/StartingFee";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {Break} from "../../components/Break/Break";
import {FC} from "react";
import {renderToString} from "react-dom/server";

export const Info: FC = () => {

    useDocumentTitle("Informace")

    const history = useHistory();

    function goto(add: Address) {
        history.push(add)
    }

    function getRaceTrack(): string {
        return renderToString(
            <a onClick={() => goto(Address.track)} className={'text-success'}>
                Detailní informace o trati včetně videa
            </a>
        )
    }

    return (
        <>
            <Row>
                <Col md={12}>
                    <h1>Informace pro účastníky</h1>
                    <p>{text.header.intro}</p>
                    <p>{text.header.organizers}</p>
                    <p>{text.header.end}</p>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <h2>Kategorie a harmonogram</h2>
                    <CategoryTable registration={text.registration} races={text.races}/>
                    <p>
                        <i>
                            * Zájemci o běh půlmaratonu z řad žen a juniorů nebudou o body do OBL ošizeni. V rámci OBL
                            jim bude v průběhu do druhého kola zaznamenán čas a budou bodově i umístěním zařazeni do
                            závodu čtvrtmaratonu.
                        </i>
                    </p>
                    <StartingFee fees={text.startingFee}/>
                </Col>

                <Col sm={12} md={6}>
                    <List header={'Propozice'} items={text.rules}/>

                    <List header={'Popis tratě'} items={[...text.track, getRaceTrack()]}/>
                    <Button
                        onClick={() => goto(Address.registration)}
                        id={'registration-button'}
                        variant={'success'}
                    >
                        Chci se zaregistrovat
                    </Button>
                </Col>
            </Row>
            <Break size={16}/>
        </>
    );
};
