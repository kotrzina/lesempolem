import * as React from 'react';
import {Table} from "react-bootstrap";
import {FC} from "react";
import {GenderIcon} from "../GenderIcon/GenderIcon";
import './CategoryTable.css'


type Props = {
    registration: {
        note: string;
        timetable: {
            day: string;
            from: string;
            to: string;
        }[],
    },

    races: {
        "start": string;
        "name": string;
        "distance": string;
        "categories": {
            "name": string;
            "gender": string | 'm' | 'f';
        }[]
    }[]
};


export const CategoryTable: FC<Props> = (props: Props) => {
    return (
        <Table id="categories">
            <thead>
            {props.registration.timetable.map((reg, regIdx) => {
                return (
                    <tr key={regIdx}>
                        <td colSpan={2}>Prezence</td>
                        <td colSpan={3}>{reg.day}&nbsp;{reg.from}&nbsp;-&nbsp;{reg.to}</td>
                    </tr>
                )
            })}
            <tr>
                <td colSpan={5}>{props.registration.note}</td>
            </tr>
            <tr>
                <th>#</th>
                <th>Kategorie</th>
                <th>Start</th>
                <th>Závod</th>
                <th>Trať</th>
            </tr>
            </thead>
            <tbody>
            {props.races.map((race, raceIdx) => {
                return (
                    <React.Fragment key={raceIdx}>
                        {race.categories.map((category, categoryIdx) => {
                            return (
                                <tr className={'race-' + raceIdx} key={categoryIdx}>
                                    <td><GenderIcon gender={category.gender}/></td>
                                    <td>{category.name}</td>
                                    <td>{race.start}</td>
                                    <td>{race.name}</td>
                                    <td>{race.distance}</td>
                                </tr>
                            )
                        })}
                    </React.Fragment>
                )
            })}
            </tbody>
        </Table>
    );
};
