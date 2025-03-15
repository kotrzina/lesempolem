import {Col, Ratio, Row} from "react-bootstrap";
import {FC} from "react";
import {DownloadableFiles} from "./DownloadableFiles";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {Break} from "../../components/Break/Break";

export const Track: FC = () => {

    useDocumentTitle("Trať")

    return (
        <Row>
            <Col md={12}>
                <h1>Trať</h1>

                {/*<TrackAlert/>*/}

                <p>Trať jednoho kola (14 km).</p>

                <Ratio aspectRatio={'16x9'}>
                    <iframe style={{border: "none"}}
                            src="https://en.frame.mapy.cz/s/gumohusame"
                            width="100%"
                            height="400"
                            frameBorder="0">
                    </iframe>
                </Ratio>
                <Break size={16}/>
                <DownloadableFiles files={[
                    {name: 'borak-veselice-14km.gpx', path: '/maps/borak-veselice-14km.gpx'},
                ]}/>
            </Col>
        </Row>
    );
};
