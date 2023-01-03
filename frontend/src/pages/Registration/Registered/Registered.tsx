import {Col, Row} from "react-bootstrap";
import {RegisteredList} from "../RegisteredList/RegisteredList";
import {Racer} from "../../../api/backend";
import {FC} from "react";

type Props = {
    racers: Array<Racer>;
};
export const Registered: FC<Props> = (props: Props) => {

    // sort racers from newest to oldest - based on registration time
    function sorter(a: Racer, b: Racer): number {
        // created is always set - guaranteed by backend
        if (a.created && b.created && a.created.getTime() < b.created.getTime()) {
            return 1;
        }

        return 0;
    }

    return (
        <Row>
            <Col md={6}>
                <h2>Registrovaní:</h2>
                <RegisteredList racers={props.racers.sort(sorter)}/>
            </Col>
        </Row>
    );
};
