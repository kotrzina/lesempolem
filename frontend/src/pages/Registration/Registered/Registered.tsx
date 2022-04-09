import {Col, Row} from "react-bootstrap";
import {RegisteredList} from "../RegisteredList/RegisteredList";
import {Racer} from "../../../api/backend";
import {FC} from "react";

type Props = {
    racers: Array<Racer>;
};
export const Registered: FC<Props> = (props: Props) => {
    return (
        <Row>
            <Col md={6}>
                <h2>Registrovaní:</h2>
                <RegisteredList racers={props.racers.filter(() => {
                    return true // do not split males and females
                })}/>
            </Col>
        </Row>
    );
};
