import {FC} from "react";

type Item = string | JSX.Element;

type Props = {
    header: string | JSX.Element;
    items: Item[];
};

export const List: FC<Props> = (props: Props) => {
    return (
        <>
            <h2>{props.header}</h2>
            <ul>
                {props.items.map((item, itemIdx) => {
                    return <li key={itemIdx} dangerouslySetInnerHTML={{__html: item as string}}></li>
                })}
            </ul>
        </>
    );
};
