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
                return "16";
            case "registrationTo":
                return "15"
        }
    }

    function getYear(): string {
        return "2026"
    }

    if (props.format === "short") {
        return (
            <>
                {getDay()}.&nbsp;5.&nbsp;{getYear()}
            </>
        );
    }

    return (
        <>
            {getDay()}.&nbsp;května&nbsp;{getYear()}
        </>
    );
};
