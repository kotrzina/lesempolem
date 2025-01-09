import {FC} from "react";
import {Badge} from "react-bootstrap";

type Props = {
    club: string
};


export const Club: FC<Props> = (props: Props) => {
    if (props.club === "") {
        return null
    }

    return (
        <>
            &nbsp;&nbsp;<Badge bg="success">{props.club}</Badge>
        </>
    );
}

export default Club;
