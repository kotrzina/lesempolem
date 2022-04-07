import * as React from 'react';
import {Col, Row} from "react-bootstrap";
import {CompassControl, KeyboardControl, Map, Marker, MarkerLayer, MouseControl} from "react-mapycz";
import {Break} from "../../../components/Break/Break";

type Props = {};
export const LocationMap = (props: Props) => {
    return (
        <Row>
            <Col md={12}>
                <h2>Mapka:</h2>
                <Map center={{lat: 49.3891403, lng: 16.7038214}} height={'500px'} zoom={14}>
                    <MarkerLayer>
                        <CompassControl/>
                        <MouseControl zoom={true}/>
                        <KeyboardControl/>
                        <Marker coords={{lat: 49.3891403, lng: 16.7038214}}/>
                    </MarkerLayer>
                </Map>
                <Break size={16}/>
            </Col>
        </Row>
    );
};