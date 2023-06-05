import {Col, Row, Spinner} from "react-bootstrap";
import {RegisteredList} from "../RegisteredList/RegisteredList";
import {Racer} from "../../../api/backend";
import {FC} from "react";

type Props = {
    racers: Array<Racer>;
    loading: boolean;
};

export const Registered: FC<Props> = (props: Props) => {

    // sort racers from newest to oldest - based on registration time
    function sorter(a: Racer, b: Racer): number {
        // created is always set - guaranteed by backend
        if (a.created && b.created && a.created.getTime() < b.created.getTime()) {
            return 1;
        }

        return -1;
    }

    return (
        <Row>
            <Col md={6}>
                <h2>
                    {props.loading && <><Spinner animation={"border"} variant={"secondary"}/>&nbsp;</>}
                    Registrovaní:
                </h2>
                <RegisteredList racers={props.racers.sort(sorter)}/>
            </Col>
        </Row>
    );
};
