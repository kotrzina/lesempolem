import * as React from 'react';
import {FC} from "react";
import {Row, Col, Image, InputGroup, FormControl} from "react-bootstrap";
import danPhoto from './photos/dan.jpg'
import jirkaPhoto from './photos/jirka.jpg'
import kozelPhoto from './photos/kozel.jpg'
import tomasPhoto from './photos/tom2.jpg'
import './Contact.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons'
import {Map, MarkerLayer, Marker, CompassControl, KeyboardControl, MouseControl} from 'react-mapycz'
import {useDocumentTitle} from "../../hooks/useDocumentTitle";

type Props = {};
export const Contact: FC<Props> = (props: Props) => {

    useDocumentTitle('Kontakty')

    return (
        <>
            <Row>
                <Col md={12} sm={6}>
                    <h1>Kontakty na pořadatele</h1>
                </Col>
            </Row>

            <Row id={'persons'}>
                <Person
                    name={'Jirka Skoták'}
                    photoPath={jirkaPhoto}
                    description={'Jirka je hlavním myslitelem běhu Lesempolem a dělá pro něj skoro vše. Oficiálně pak figuruje jako hlavní pořadatel a řešitel ostatních průserů.'}
                    email={'skotak@jiskel.cz'}
                    phone={'777 250 164'}
                />
                <Person
                    name={'Dan Orálek'}
                    photoPath={danPhoto}
                    description={'Dan z pozice veselského domorodce a sportovního ředitele Lesempolem předává své bohaté zkušenosti a piluje závod takřka k dokonalosti.'}
                    email={'Daniel.Oralek@anet.eu'}
                    phone={'603 179 381'}
                />
                <Person
                    name={'Tomáš Kozák'}
                    photoPath={tomasPhoto}
                    description={'Pro Lesempolem zajišťuje grafiku, web, platby a především měření výsledků přímo na závodech. Najdete ho v cíli u počítače nebo na mailu.'}
                    email={'kozak@talko.cz'}
                    phone={'730 996 957'}
                />
                <Person
                    name={'Luba Němec'}
                    photoPath={kozelPhoto}
                    description={'Náš Kozlík shání a diriguje tu spoustu lidí, kteří vás pak po trati směrují, abyste nám někde nezabloudili. Také zajištuje všechny dobroty k jídlu a pití.'}
                    email={'lubanemec88@gmail.com'}
                    phone={'728 637 987'}
                />
            </Row>

            <Row>
                <Col md={12}>
                    <h2>Mapka:</h2>
                    <Map center={{lat: 49.3891403, lng: 16.7038214}} height={'500px'} zoom={14}>
                        <MarkerLayer>
                            <CompassControl />
                            <MouseControl zoom={true} />
                            <KeyboardControl />
                            <Marker coords={{lat: 49.3891403, lng: 16.7038214}} />
                        </MarkerLayer>
                    </Map>

                </Col>
            </Row>

            <Row>
                <Col md={12}>
                    <h2>Open source</h2>
                    <p>
                        Zdrojové kódy stránky lesempolem.cz jsou dostupné na adrese
                        <a
                            href={'https://gitlab.com/kotrzina/lesempolem'}
                            rel={'noreferrer'}
                            target={'_blank'}
                        > https://gitlab.com/kotrzina/lesempolem</a>.
                        Pull request určitě uvítáme!
                    </p>
                </Col>
            </Row>
        </>
    );
};

type PersonProps = {
    name: string;
    photoPath: string;
    description: string | JSX.Element
    email: string;
    phone: string;
}

const Person: FC<PersonProps> = (props: PersonProps) => {
    function copyText(v: string) {
        navigator.clipboard.writeText(v).then(r => {
            // string copied!
        })
    }

    return (
        <Col md={3} sm={6}>
            <div className="thumbnail">
                <Image className={'userImage'} roundedCircle src={props.photoPath} alt="Fotka Jiřího Skotáka"/>
                <div className="caption">
                    <h3>{props.name}</h3>
                    <p>{props.description}</p>
                    <div>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    onClick={() => copyText(props.email)}
                                />
                            </InputGroup.Text>
                            <FormControl value={props.email} readOnly={true}/>
                        </InputGroup>
                        <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    onClick={() => copyText(props.phone)}
                                />
                            </InputGroup.Text>
                            <FormControl value={props.phone} readOnly={true}/>
                        </InputGroup>
                    </div>
                </div>
            </div>
        </Col>
    )
}