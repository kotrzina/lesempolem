import './Photo.css'
import {FC} from "react";

interface Props {
    src: string;
    alt?: string
}

export const Photo: FC<Props> = (props: Props) => {
    return (
        <img className={'photo img-responsive'} src={props.src} alt={props.alt}/>
    )
}
