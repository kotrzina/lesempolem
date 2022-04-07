import * as React from 'react';
import {Racer} from "../../../api/backend";

type Props = {
    racers: Array<Racer>
};


export const RegisteredList = (props: Props) => {

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