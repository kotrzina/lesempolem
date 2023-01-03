import {FC} from "react";
import {Form} from "react-bootstrap";

interface Props {
    id: string;
    type: "email" | "text" | "date";
    value: string;
    label: string;
    placeholder: string;
    fieldError: boolean;
    fieldErrorDescription?: string;
    enabled: boolean;

    onChange(v: string): void;
}

export const TextFormField: FC<Props> = (props) => {

    const type = props.type == null ? 'text' : props.type;

    return (
        <Form.Group controlId={props.id}>
            <Form.Label><strong>{props.label}:</strong></Form.Label>
            <Form.Control
                required={true}
                value={props.value}
                disabled={!props.enabled}
                isInvalid={props.fieldError}
                type={type}
                placeholder={props.placeholder}
                onChange={(e) => props.onChange(e.target.value)}/>
            {props.fieldError && props.fieldErrorDescription !== null &&
                <Form.Text className="text-danger">
                    {props.fieldErrorDescription}
                </Form.Text>
            }
        </Form.Group>
    )

}
