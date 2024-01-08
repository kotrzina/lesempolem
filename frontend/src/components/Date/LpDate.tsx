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
                return "9";
            case "registrationTo":
                return "8"
        }
    }

    function getYear(): string {
        return "2024"
    }

    if (props.format === "short") {
        return (
            <>
                {getDay()}.&nbsp;3.&nbsp;{getYear()}
            </>
        );
    }

    return (
        <>
            {getDay()}.&nbsp;březen&nbsp;{getYear()}
        </>
    );
};
