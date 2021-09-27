import * as React from 'react';
import {FC, useEffect, useState, useMemo} from "react";
import {useParams} from "react-router-dom";
import {Col, Row} from "react-bootstrap";
import {RaceTable} from "./RaceTable";
import './Results.css'
import {useDocumentTitle} from "../../hooks/useDocumentTitle";

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

type Props = {};

export const Results: FC<Props> = (props: Props) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [title, setTitle] = useDocumentTitle("Výsledky závodu");

    const defaultState = useMemo<Competition>(() => {
        return {title: '', races: [], year: 0}
    }, []);

    const {year} = useParams<Params>()
    const [competition, setCompetition] = useState<Competition>(defaultState)

    useEffect(() => {
        setTitle("Výsledky závodu v roce " + year)
        import ('./results/' + year + '.json')
            .then((data => {
                setCompetition(data.default)
            }))
            .catch((err) => {
                setCompetition(defaultState)
                alert(err)
            })
    }, [year, defaultState, setTitle])

    return (
        <>
            <Row id={'all-results'}>
                <Col md={6}>
                    <h1>{competition.title}</h1>
                </Col>

                {competition.races.map((race, raceIdx) => (
                    <RaceTable race={race} key={raceIdx}/>
                ))}
            </Row>
        </>
    );
};