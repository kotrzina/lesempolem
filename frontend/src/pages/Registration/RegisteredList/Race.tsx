import {FC} from "react";
import {Badge} from "react-bootstrap";

type Props = {
    distance: string
};


export const Club: FC<Props> = (props: Props) => {
    function parseDistance(d: string): number {
        const distance = parseInt(d);

        return distance
    }

    if (props.distance === "") {
        return null
    }

    return (
        <>
            &nbsp;&nbsp;<Badge bg="danger">{parseDistance(props.distance)} km</Badge>
        </>
    );
}

export default Club;
