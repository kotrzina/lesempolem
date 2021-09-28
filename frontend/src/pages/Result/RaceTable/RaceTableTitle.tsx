import * as React from 'react';

type Props = {
    title: string;
    distance: number; // in meters
};

export const RaceTableTitle = (props: Props) => {

    function getTitle(): string {
        if (props.title) {
            return props.title + " - " + formatDistance(props.distance)
        } else {
            return formatDistance(props.distance)
        }
    }

    function formatDistance(d: number): string {
        if (d < 2000) {
            const t = Math.floor(d / 1000)
            let ret = ""
            if (t > 0) {
                ret += (t).toString() + " "
            }
            return ret + (d - Math.floor(d / 1000) * 1000) + " m"
        }

        return ((d / 1000) + " km").replace('.', ',')
    }

    return (
        <h2>{getTitle()}</h2>
    );
};