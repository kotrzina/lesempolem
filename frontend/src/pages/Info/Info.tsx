import * as React from 'react';
import {Button, Col, Row} from "react-bootstrap";
import text from './texts.json'
import {CategoryTable} from "../../components/CategoryTable/CategoryTable";
import {List} from "../../components/List/List";
import {useHistory} from "react-router-dom";
import Address from "../../Address";
import './Info.css'
import {StartingFee} from "../../components/StartingFee/StartingFee";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";

type Props = {};

export const Info = (props: Props) => {

    useDocumentTitle("Informace")

    const history = useHistory();

    function goto(add: Address) {
        history.push(add)
    }

    function getRaceTrack(): JSX.Element {
        return <a href="#race" onClick={() => goto(Address.track)} className={'text-success'}>
            Detailní informace o trati včetně videa
        </a>
    }

    return (
        <>
            <Row>
                <Col md={12}>
                    <h1>Informace pro účastníky</h1>
                    <p>{text.header.intro}</p>
                    <p>{text.header.accommodation}</p>
                    <p>{text.header.organizers}</p>
                    <p>{text.header.end}</p>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <h2>Kategorie a harmonogram</h2>
                    <CategoryTable registration={text.registration} races={text.races}/>
                </Col>

                <Col sm={12} md={6}>
                    <List header={'Propozice'} items={text.rules}/>
                    <StartingFee fees={text.startingFee}/>
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
        </>
    );
};