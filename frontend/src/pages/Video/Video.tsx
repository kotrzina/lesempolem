import * as React from 'react';
import {Col, ResponsiveEmbed, Row} from "react-bootstrap";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";

type Props = {};
export const Video = (props: Props) => {

    useDocumentTitle("Video")

    return (
        <Row>
            <Col md={12}>
                <h1>Sestřih ze závodů - video</h1>
                <ResponsiveEmbed aspectRatio={'16by9'}>
                    <iframe
                        className="embed-responsive-item"
                        src="https://www.youtube.com/embed/JSZ0lRwT7R0?rel=0"
                        title={'Video'}
                        allowFullScreen>

                    </iframe>
                </ResponsiveEmbed>
            </Col>
        </Row>
    );
};