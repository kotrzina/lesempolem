import {Col, Row} from "react-bootstrap";
import React, {FC} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Icon, LatLngLiteral} from "leaflet";
import "./LocationMap.css";
import rocketIcon from "./img/rocket.png";
import parkingIcon from "./img/parking.png";

export const LocationMap: FC = () => {

    const key = "imrnXWXDs-DB0RyF8CEB3Cskc8qEP5VTPDAloE1K874"
    const url = `https://api.mapy.cz/v1/maptiles/basic/256/{z}/{x}/{y}?lang=cs&apikey=${key}`

    const center: LatLngLiteral = {
        lat: 49.3951897,
        lng: 16.7111050,
    }

    const kd: LatLngLiteral = {
        lat: 49.3933369,
        lng: 16.7069478,
    }

    const parking: LatLngLiteral = {
        lat: 49.3929028,
        lng: 16.7069583,
    }

    function createIcon(iconUrl: string, size: number): Icon {
        return new Icon({
            iconUrl: iconUrl,
            iconSize: [size, size],
        });
    }

    return (
        <Row>
            <Col md={12} className={"mb-4"}>
                <h2>Mapka:</h2>
                <div id="map-container">
                    <MapContainer center={center} zoom={16} scrollWheelZoom={true}>
                        <TileLayer url={url}/>

                        <Marker position={parking} icon={createIcon(parkingIcon, 24)}>
                            <Popup>Parkovaní</Popup>
                        </Marker>

                        <Marker position={kd} icon={createIcon(rocketIcon, 28)}>
                            <Popup>Registrace / Start / Cíl</Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </Col>
        </Row>
    );
};
