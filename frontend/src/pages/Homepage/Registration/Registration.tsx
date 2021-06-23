import {FC, useState} from "react";
import {Button, Form} from "react-bootstrap";

interface Props {

}

export const Registration: FC<Props> = (props) => {

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [dob, setDob] = useState('')

    return (
        <div>
            <h1>Registrace na Lesempolem</h1>
            <p>
                Zde se můžeš na Lesempolem zaregistrovat. Závody se uskuteční 12. 6. 2021. Zajistíš si tím, že už tě
                budeme
                mít v počítači a tvoje odbavení při přidělení čísla na místě bude mnohem rychlejší. Registraci je možné
                přovést na všechny závody. Pokud stále nejsi rozhodnutý, rozklikni si další pravidla a informace o
                Lesempolem.
            </p>
            <Form>
                <FormField id={'name'} label={'Jméno'} placeholder={'Zadejte Vaše jméno'} onChange={setName}/>
                <FormField id={'surname'} label={'Příjmení'} placeholder={'Zadejte Vaše příjmení'}
                           onChange={setSurname}/>
                <FormField id={'dob'} type={'date'} label={'Datum narození:'} placeholder={''} onChange={setDob}/>

                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out"/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

interface FormFieldProps {
    id: string;
    type?: string;
    label: string;
    placeholder: string;
    description?: string

    onChange(v: string): void;
}

const FormField: FC<FormFieldProps> = (props) => {

    function TextDescription() {
        if (props.description !== null) {
            return (
                <Form.Text className="text-muted">
                    {props.description}
                </Form.Text>
            )
        }

        return <></>
    }

    const type = props.type === null ? 'text' : props.type;
    return (
        <Form.Group controlId={props.id}>
            <Form.Label><strong>{props.label}: </strong></Form.Label>
            <Form.Control type={type} placeholder={props.placeholder} onChange={(e) => props.onChange(e.target.value)}/>
            <TextDescription/>
        </Form.Group>
    )

}
