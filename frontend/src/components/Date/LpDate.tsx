import * as React from 'react';
import {FC} from "react";

type Props = {
    type: 'lp' | 'registrationTo';
    format: "short" | "long";
}

export const LpDate: FC<Props> = (props: Props) => {

    function getDay(): string {
        switch (props.type) {
            case "lp":
                return "10";
            case "registrationTo":
                return "9"
        }
    }

    function getYear(): string {
        return "2023"
    }

    if (props.format === "short") {
        return (
            <>
                {getDay()}.&nbsp;6.&nbsp;{getYear()}
            </>
        );
    }

    return (
        <>
            {getDay()}.&nbsp;červen&nbsp;{getYear()}
        </>
    );
};
