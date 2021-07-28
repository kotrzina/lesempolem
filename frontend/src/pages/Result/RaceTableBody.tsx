import * as React from 'react';
import {Race, Result} from "./Results";
import {isMultilap, showCategories, showCategoryPlaces, showClub} from "./RaceTableModel";

type Props = {
    race: Race
};


export const RaceTableBody = (props: Props) => {

    function getRow(result: Result): Array<string> {
        let cols: Array<string> = []

        cols.push(result.place ? result.place.toString() : "")
        cols.push(result.sn)
        cols.push(result.name)

        if (showCategories(props.race)) {
            cols.push(result.category ? result.category : "")
        }

        if (showCategoryPlaces(props.race)) {
            cols.push(result.category_place ? result.category_place.toString() : "")
        }

        if (showClub(props.race)) {
            cols.push(result.club ? result.club : "")
        }

        const multilap = isMultilap(props.race)
        if (!multilap) {
            if (result.dnf || result.dns) {
                cols = [...cols, ...disqualificationRow(props.race.laps, result.dnf, result.dns)]
                cols.push("") // diff
            } else {
                cols.push(result.laps[0].time)
                cols.push(result.laps[0].diff)
            }
        } else {
            if (result.dnf || result.dns) {
                cols = [...cols, ...disqualificationRow(props.race.laps, result.dnf, result.dns)]
            } else {
                result.laps.map(lap => cols.push(lap.time + " [" + lap.position + "]"))
            }
        }


        return cols;
    }

    function disqualificationRow(laps: number, dnf?: boolean, dns?: boolean): Array<string> {
        let cols: Array<string> = []

        for (let i = 0; i < props.race.laps; i++) {
            if (i === 0) {
                if (dns) {
                    cols.push("DNS")
                } else if (dnf) {
                    cols.push("DNF")
                } else {
                    throw Error("unknown disqualification")
                }
            } else {
                cols.push("")
            }
        }

        return cols
    }

    return (
        <tbody>

        {props.race.results.map((result, idx) => {
            return (
                <tr key={idx}>
                    {getRow(result).map((item, itemIdx) => {
                        return (
                            <td key={itemIdx}>{item}</td>
                        )
                    })}
                </tr>
            )
        })}

        </tbody>
    );
};
