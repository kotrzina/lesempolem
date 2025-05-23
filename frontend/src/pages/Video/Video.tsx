import {Col, Ratio, Row} from "react-bootstrap";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {Break} from "../../components/Break/Break";
import {FC} from "react";

export const Video: FC = () => {

    useDocumentTitle("Video")

    return (
        <Row>
            <Col md={12}>
                <h1>Video - jedeno kolo</h1>
                <Ratio aspectRatio={'16x9'}>
                    <iframe
                        className="embed-responsive-item"
                        src="https://www.youtube.com/embed/bgcMtzmA-7s?rel=0"
                        title={'Video'}
                        allowFullScreen>
                    </iframe>
                </Ratio>
            </Col>
            <Break size={16}/>
        </Row>
    );
};
