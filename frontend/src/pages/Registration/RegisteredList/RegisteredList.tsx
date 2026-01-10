import {Racer} from "../../../api/backend";
import {FC} from "react";
import {ListGroup} from "react-bootstrap";
import Club from "./Club";
import Distance from "./Race";

type Props = {
    racers: Array<Racer>
};


export const RegisteredList: FC<Props> = (props: Props) => {
    return (
        <ListGroup>
            {props.racers.map((racer, idx) => {
                return (
                    <ListGroup.Item key={idx}>{racer.firstname} {racer.lastname}
                        <Club club={racer.club}/>
                        <Distance distance={racer.race}/>
                    </ListGroup.Item>

                )
            })}
        </ListGroup>
    );
};
