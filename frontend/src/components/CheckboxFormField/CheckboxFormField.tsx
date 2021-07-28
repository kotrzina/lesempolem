import * as React from 'react';
import {Form} from "react-bootstrap";
import {ChangeEvent, useState} from "react";

type Props = {
    id: string;
    label: string | JSX.Element;
    checked: boolean;
    onChange(v: boolean): void;
};

export const CheckboxFormField = (props: Props) => {

    const [isChecked, setChecked] = useState(props.checked)

    function checkedChanged(e: ChangeEvent<HTMLInputElement>) {
        props.onChange(e.target.checked)
        setChecked(e.target.checked)
    }

    return (
        <Form.Group controlId={props.id}>
            <Form.Check
                isInvalid={!isChecked}
                checked={isChecked}
                type="checkbox"
                label={props.label}
                onChange={checkedChanged}
            />
        </Form.Group>
    );
};