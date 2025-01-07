import {FC} from "react";
import {Row, Col} from "react-bootstrap";
import danPhoto from './photos/dan.jpg'
import jirkaPhoto from './photos/jirka.jpg'
import kozelPhoto from './photos/kozel.jpg'
import tomasPhoto from './photos/tom2.jpg'
import './Contact.css'
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {Person} from "./Person/Person";

export const Contact: FC = () => {

    useDocumentTitle('Kontakty')

    const people = [
        {
            name: 'Jirka Skoták',
            photoPath: jirkaPhoto,
            description: 'Jirka je hlavním myslitelem běhu Lesempolem a dělá pro něj skoro vše. Oficiálně pak figuruje jako hlavní pořadatel a řešitel ostatních průserů.',
            email: 'skotak@jiskel.cz',
            phone: '777 250 164',
        },
        {
            name: 'Dan Orálek',
            photoPath: danPhoto,
            description: 'Dan z pozice veselského domorodce a sportovního ředitele Lesempolem předává své bohaté zkušenosti a piluje závod takřka k dokonalosti.',
            email: 'Daniel.Oralek@anet.eu',
            phone: '603 179 381',
        },
        {
            name: 'Tomáš Kozák',
            photoPath: tomasPhoto,
            description: 'Pro Lesempolem zajišťuje grafiku, web, platby a především měření výsledků přímo na závodech. Najdete ho v cíli u počítače nebo na mailu.',
            email: 'kozak@talko.cz',
            phone: '730 996 957',
        },
        {
            name: 'Luba Němec',
            photoPath: kozelPhoto,
            description: 'Náš Kozlík shání a diriguje tu spoustu lidí, kteří vás pak po trati směrují, abyste nám někde nezabloudili. Také zajištuje všechny dobroty k jídlu a pití.',
            email: 'lubanemec88@gmail.com',
            phone: '728 637 987',
        }
    ]

    const vsLink = 'https://github.com/kotrzina/lesempolem'

    return (
        <>
            <Row>
                <Col md={12}>
                    <h1>Kontakty na pořadatele</h1>
                </Col>
            </Row>

            <Row md={6} sm={6} id={'persons'}>
                {people.map(person => {
                    return (
                        <Person key={person.name}
                            name={person.name}
                            photoPath={person.photoPath}
                            description={person.description}
                            email={person.email}
                            phone={person.phone}
                        />
                    )
                })}
            </Row>

            {/*<LocationMap/>*/}

            <Row>
                <Col md={12}>
                    <h2>Open source</h2>
                    <p>
                        Zdrojové kódy stránky lesempolem.cz jsou dostupné na adrese
                        <a href={vsLink} rel={'noreferrer'} target={'_blank'}> {vsLink}</a>.
                        Pull request určitě uvítáme!
                    </p>
                </Col>
            </Row>
        </>
    );
};
