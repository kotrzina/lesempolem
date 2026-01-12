import {Button, Col, Row} from "react-bootstrap";
import {CategoryTable} from "./CategoryTable/CategoryTable";
import {List} from "./List/List";
import {useNavigate} from "react-router-dom";
import Address from "../../Address";
import './Info.css'
import {StartingFee} from "./StartingFee/StartingFee";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {Break} from "../../components/Break/Break";
import {FC} from "react";
import {renderToString} from "react-dom/server";

const rules = [
    "Název: LESEMPOLEM",
    "Datum: 16. 5. 2026",
    "Čas startu: 07:00 a 11:00",
    "Prezence min. 15 minut před startem závodu",
    "Místo startu: Víceúčelová budova kulturního domu ve Veselici",
    "Pro zařazení do kategorie je rozhodující rok narození."
];

const track = [
    "Kolo 14 km",
    "Trať vede převážně po polních a lesních cestách (90 %) a pouze 10 % po asfaltových cestách"
];

const registration = {
    timetable: [
        { day: "pá", from: "18:00", to: "20:00" },
        { day: "so", from: "06:00", to: "10:45" }
    ],
    note: "Prezence min 15 min před startem závodu"
};

const races = [
    {
        name: "Ultramaraton",
        start: "07:00",
        distance: "84 km",
        categories: [
            { name: "Muži do 39 let", gender: "m" },
            { name: "Muži do 40 - 59 let", gender: "m" },
            { name: "Muži nad 60 let", gender: "m" },
            { name: "Ženy do 39 let", gender: "f" },
            { name: "Ženy do 40 - 59 let", gender: "f" },
            { name: "Ženy nad 60 let", gender: "f" }
        ]
    },
    {
        name: "Maraton",
        start: "11:00",
        distance: "42 km",
        categories: [
            { name: "Muži", gender: "m" },
            { name: "Ženy", gender: "f" }
        ]
    },
    {
        name: "Kolo",
        start: "11:00",
        distance: "14 km",
        categories: [
            { name: "Muži", gender: "m" },
            { name: "Ženy", gender: "f" }
        ]
    }
];

const startingFee = [
    { name: "Ultramaraton", price: 1000, note: "Pro členy ČAU sleva 200 Kč" },
    { name: "Maraton", price: 500 },
    { name: "Kolo", price: 200 }
];

export const Info: FC = () => {

    useDocumentTitle("Informace")

    const navigate = useNavigate();

    function goto(add: Address) {
        navigate(add)
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
                    <p>Nejen vytrvalostní běžce ale i všechny ty kdo milují pohyb v přírodě, zveme na další ročník mezi běžci oblíbený ultra podnik navazující na tradiční Loštický „Borák".</p>
                    <p>Jako každý rok bude v místě průběhu do dalšího kola a v cíli bude připraveno bohaté občerstvení dodané pořadateli (voda, čaj, iontový nápoj, sůl, Coca cola, ovoce) + stoly určené pro možnost uložení vlastního občerstvení. Ani letos nebude chybět oblíbená tradiční Loštická pomazánka.</p>
                    <p>Pro příchozí diváky bude připraven kulturní program, udírna, výčep, bohaté občerstvení a napínavé doprovodné dětské běhy v kategoriích dle vzrůstu, vyspělosti a počtu příchozích.</p>
                    <p>Prezence a zázemí závodu bude tradičně v kulturním domě (Informační centrum ve Veselici) v těsné blízkosti startu a cíle. Parkování bude zajištěno na parkovištích ve vzdálenosti 200m od prezentace. Z pátku na sobotu bude umožněno za symbolický poplatek přespání v kulturním domě ve vlastních spacácích.</p>
                    <p>Celá akce probíhající ve složitém terénu spočívá na dobrovolné práci pořadatelů – dobrovolníků. Snad se i letos tak, jak v předešlých ročnících všechna vynaložená námaha a atmosféra příprav přenese až k vám, účastníkům a návštěvníkům tohoto závodu. Těšíme se na vás!</p>
                </Col>
            </Row>

            <Row>
                <Col sm={12} md={6}>
                    <h2>Kategorie a harmonogram</h2>
                    <CategoryTable registration={registration} races={races}/>
                    <StartingFee fees={startingFee}/>
                </Col>

                <Col sm={12} md={6}>
                    <List header={'Propozice'} items={rules}/>

                    <List header={'Popis tratě'} items={[...track, getRaceTrack()]}/>
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
