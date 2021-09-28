import * as React from 'react';

type Props = {
    size: number
};

export const Break = (props: Props) => {
    return (
        <div style={{paddingBottom: props.size + "px"}}>&nbsp;</div>
    );
};
