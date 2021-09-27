import * as React from 'react';
import {Col, ResponsiveEmbed, Row} from "react-bootstrap";
import {FC} from "react";
import {DownloadableFiles} from "./DownloadableFiles";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";

type Props = {};
export const Track: FC<Props> = (props: Props) => {

    useDocumentTitle("Trať")

    return (
        <Row>
            <Col md={12}>
                <h1>Trať</h1>
                <p>Trať jednoho kola (10,5 km).</p>

                <ResponsiveEmbed aspectRatio={'16by9'}>
                    <iframe
                        src="https://www.google.com/maps/d/embed?mid=1k1C0Q-ZJPitjidSe98vClAma_f4yHD2-"
                        width="100%"
                        title={'Google Map with Track'}
                        height="600px">
                    </iframe>
                </ResponsiveEmbed>

                <DownloadableFiles files={[
                    {name: 'lesempolem2021_102nodes.gpx', path: '/maps/2021/lesempolem2021_102nodes.gpx'},
                    {name: 'lesempolem2021_102nodes.kml', path: '/maps/2021/lesempolem2021_102nodes.kml'},
                ]}/>
            </Col>
        </Row>
    );
};

