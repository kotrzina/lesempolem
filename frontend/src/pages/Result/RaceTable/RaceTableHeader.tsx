import {Race} from "../Results";
import {isMultilap, showCategories, showCategoryPlaces, showClub} from "./RaceTableModel";
import {FC} from "react";

type Props = {
    race: Race
};

export const RaceTableHeader: FC<Props> = (props: Props) => {

    function getHeaders(): Array<string> {
        const cols: Array<string> = []
        cols.push('Poř.')
        cols.push('S. číslo')
        cols.push('Jméno')

        if (showCategories(props.race)) {
            cols.push('Kategorie')
        }

        if (showCategoryPlaces(props.race)) {
            cols.push('Poř. kat.')
        }

        if (showClub(props.race)) {
            cols.push('Klub')
        }

        const multilap = isMultilap(props.race)

        if (!multilap) {
            cols.push('Čas')
            cols.push('Ztráta')
        }

        if (multilap) {
            for (let i = 1; i <= props.race.laps; i++) {
                cols.push(props.race.distance / props.race.laps * i / 1000 + " km")
            }
        }


        return cols;
    }

    return (
        <thead>
        <tr>
            {getHeaders().map((header, idx) => {
                return (
                    <th key={idx}>{header}</th>
                )
            })}
        </tr>
        </thead>
    );
};
