import {FC} from "react";
import {Form} from "react-bootstrap";

interface Props {
    id: string;
    type?: string;
    label: string;
    placeholder: string;
    fieldError?: boolean;
    fieldErrorDescription?: string;

    onChange(v: string): void;
}

export const TextFormField: FC<Props> = (props) => {

    function TextDescription() {
        if (props.fieldError && props.fieldErrorDescription !== null) {
            return (
                <Form.Text className="text-danger">
                    {props.fieldErrorDescription}
                </Form.Text>
            )
        }

        return <></>
    }

    const type = props.type === null ? 'text' : props.type;

    return (
        <Form.Group controlId={props.id}>
            <Form.Label><strong>{props.label}:</strong></Form.Label>
            <Form.Control
                required={true}
                isInvalid={props.fieldError}
                type={type}
                placeholder={props.placeholder}
                onChange={(e) => props.onChange(e.target.value)}/>
            <TextDescription/>
        </Form.Group>
    )

}