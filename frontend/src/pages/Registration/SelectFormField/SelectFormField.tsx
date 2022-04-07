import {FC} from "react";
import {Form} from "react-bootstrap";


interface SelectOption {
    value: string;
    label: string;
}

interface Props {
    id: string;
    value: string;
    label: string;
    options: SelectOption[];
    enabled: boolean;

    onChange(v: string): void;
}

export const SelectFormField: FC<Props> = (props) => {
    return (
        <Form.Group controlId={props.id}>
            <Form.Label><strong>{props.label}</strong></Form.Label>
            <Form.Control
                as="select"
                value={props.value}
                disabled={!props.enabled}
                required={true}
                onChange={(e) => props.onChange(e.target.value)}
            >
                {props.options.map((o) => {
                    return <option key={o.value} value={o.value}>{o.label}</option>
                })}

            </Form.Control>
        </Form.Group>
    )
}