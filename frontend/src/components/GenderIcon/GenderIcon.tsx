import femaleIcon from "./images/female.png";
import maleIcon from "./images/male.png";
import {FC} from "react";

type Props = {
    gender: string | 'm' | 'f';
};

export const GenderIcon: FC<Props> = (props: Props) => {
    function getImageSource(): string {
        if (props.gender === 'f') {
            return femaleIcon
        }
        if (props.gender === 'm') {
            return maleIcon
        }

        return ''
    }

    return (
        <img data-testid={'gender-icon'} src={getImageSource()} alt={props.gender}/>
    )
};
