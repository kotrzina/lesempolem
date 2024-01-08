import {Col, ResponsiveEmbed, Row} from "react-bootstrap";
import {FC} from "react";
import {DownloadableFiles} from "./DownloadableFiles";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {Break} from "../../components/Break/Break";
import {TrackAlert} from "./TrackAlert";

export const Track: FC = () => {

    useDocumentTitle("Trať")

    return (
        <Row>
            <Col md={12}>
                <h1>Trať</h1>

                {<TrackAlert/>}

                <p>Trať jednoho kola (10,5 km).</p>

                <ResponsiveEmbed aspectRatio={'16by9'}>
                    <iframe
                        src="https://www.google.com/maps/d/embed?mid=1k1C0Q-ZJPitjidSe98vClAma_f4yHD2-"
                        width="100%"
                        title={'Google Map with Track'}
                        height="600px">
                    </iframe>
                </ResponsiveEmbed>
                <Break size={16}/>
                <DownloadableFiles files={[
                    {name: 'lesempolem_102nodes.gpx', path: '/maps/lesempolem_102nodes.gpx'},
                    {name: 'lesempolem_102nodes.kml', path: '/maps/lesempolem_102nodes.kml'},
                ]}/>
            </Col>
        </Row>
    );
};
