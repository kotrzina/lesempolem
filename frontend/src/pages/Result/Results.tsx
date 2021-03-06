import {FC, useEffect, useState, useMemo} from "react";
import {useParams} from "react-router-dom";
import {Col, Row, Spinner} from "react-bootstrap";
import {RaceTable} from "./RaceTable/RaceTable";
import './Results.css'
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {Break} from "../../components/Break/Break";

type Params = {
    year: string;
}

export type Lap = {
    lap: number;
    time: string;
    diff: string;
    position?: number;
    lapTime?: string;
}

export type Result = {
    place?: number;
    category_place?: number;
    sn: string; // starting number
    name: string;
    club?: string;
    category?: string;
    laps: Lap[];
    dnf?: boolean;
    dns?: boolean;
}

export type Race = {
    title: string;
    distance: number; // in meters
    laps: number;
    lapDistance: number;
    results: Result[]
}

type Competition = {
    title: string;
    year: number;
    races: Race[];
}

export const Results: FC = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [, setTitle] = useDocumentTitle("Výsledky závodu");

    const [spinner, setSpinner] = useState<boolean>(true)

    const defaultState = useMemo<Competition>(() => {
        return {title: '', races: [], year: 0}
    }, []);

    const {year} = useParams<Params>()
    const [competition, setCompetition] = useState<Competition>(defaultState)

    useEffect(() => {
        setSpinner(true)
        setTitle("Výsledky závodu v roce " + year)
        import ('./results/' + year + '.json')
            .then((data => {
                setCompetition(data.default)
                setSpinner(false)
            }))
            .catch((err) => {
                setCompetition(defaultState)
                setSpinner(false)
                alert(err)
            })
    }, [year, defaultState, setTitle])

    function showSpinner(): JSX.Element {

        if (spinner) {
            return (
                <Col sm={12} className={'center'}>
                    <Break size={16}/>
                    <Spinner animation="border" variant="success"/>
                    <Break size={16}/>
                </Col>
            )
        }

        return (
            <></>
        )
    }

    return (
        <>
            <Row id={'all-results'}>
                <Col sm={12}>
                    <h1>{competition.title}</h1>
                </Col>


                {showSpinner()}

                {competition.races.map((race, raceIdx) => (
                    <RaceTable race={race} key={raceIdx}/>
                ))}
            </Row>
        </>
    );
};
