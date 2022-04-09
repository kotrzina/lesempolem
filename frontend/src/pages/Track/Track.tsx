import {Alert, Col, ResponsiveEmbed, Row} from "react-bootstrap";
import {FC} from "react";
import {DownloadableFiles} from "./DownloadableFiles";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {Break} from "../../components/Break/Break";

export const Track: FC = () => {

    useDocumentTitle("Trať")

    return (
        <Row>
            <Col md={12}>
                <Alert variant="danger">
                    <Alert.Heading>Pozor!</Alert.Heading>
                    <p>
                        Tato stránka zobrazuje zastaralou trať z roku 2021. Neočekavají se velké změny a je i dost
                        pravděpodobné, že trať zůstane beze změny. Bohužel to v tento okamžik garantovat nedokážeme.
                    </p>
                    <hr/>
                    <p className="mb-0">
                        Tato stránka včetně informací o trati bude včas aktualizována.
                    </p>
                </Alert>
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
                <Break size={16}/>
                <DownloadableFiles files={[
                    {name: 'lesempolem2021_102nodes.gpx', path: '/maps/2021/lesempolem2021_102nodes.gpx'},
                    {name: 'lesempolem2021_102nodes.kml', path: '/maps/2021/lesempolem2021_102nodes.kml'},
                ]}/>
            </Col>
        </Row>
    );
};
