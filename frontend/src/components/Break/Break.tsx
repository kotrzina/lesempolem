import {FC} from "react";

type Props = {
    size: number
};

export const Break: FC<Props> = (props: Props) => {
    return (
        <div style={{paddingBottom: props.size + "px"}}>&nbsp;</div>
    );
};
