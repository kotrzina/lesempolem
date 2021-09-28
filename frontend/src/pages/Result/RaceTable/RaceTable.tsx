import * as React from 'react';
import {FC} from "react";
import {Col, Table} from "react-bootstrap";
import {Race} from "../Results";
import {RaceTableHeader} from "./RaceTableHeader";
import {RaceTableBody} from "./RaceTableBody";
import {RaceTableTitle} from "./RaceTableTitle";

type RaceProps = {
    race: Race
};

export const RaceTable: FC<RaceProps> = (props: RaceProps) => {
    return (
        <Col md={12}>
            <RaceTableTitle title={props.race.title} distance={props.race.distance}/>
            <Table responsive={true}>
                <RaceTableHeader race={props.race}/>
                <RaceTableBody race={props.race}/>
            </Table>
        </Col>
    )
};
