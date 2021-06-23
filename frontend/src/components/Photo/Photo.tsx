import {FC} from "react";
import './Photo.css'

interface Props {
    src: string;

}

export const Photo: FC<Props> = (props) => {
    return (
        <img className={'photo img-responsive'} src={props.src} alt="test"/>
    )
}
