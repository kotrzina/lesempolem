import {Racer} from "../../../api/backend";
import {FC} from "react";

type Props = {
    racers: Array<Racer>
};


export const RegisteredList: FC<Props> = (props: Props) => {

    function club(club: string): string {
        if (club === "") {
            return ""
        }

        return ` (${club})`
    }

    return (
        <ul>
            {props.racers.map((racer, idx) => {
                return (
                    <li key={idx}>
                        {racer.firstname} {racer.lastname}{club(racer.club)}
                    </li>
                )
            })}
        </ul>
    );
};
