import {FC, useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import Address from "../../Address";
import {TextFormField} from "./TextFormField/TextFormField";
import {SelectFormField} from "./SelectFormField/SelectFormField";
import {CheckboxFormField} from "./CheckboxFormField/CheckboxFormField";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";

interface Props {
    enabled: boolean
}

export const Registration: FC<Props> = (props) => {

    useDocumentTitle("Registrace závodníků")

    interface TextInputState {
        value: string;
        error: boolean;
    }

    const defaultTextInputState = {value: '', error: false,};

    type genderType = string | 'm' | 'f'; // male, female
    const [name, setName] = useState<TextInputState>(defaultTextInputState)
    const [surname, setSurname] = useState<TextInputState>(defaultTextInputState)
    const [email, setEmail] = useState<TextInputState>(defaultTextInputState)
    const [club, setClub] = useState<TextInputState>(defaultTextInputState)
    const [dob, setDob] = useState<TextInputState>(defaultTextInputState)
    const [, setGender] = useState<genderType>('m')
    const [terms, setTerms] = useState<boolean>(true)

    function registrationFormSubmitted() {
        let ok = true;
        const minStringLength = 1;
        if (name.value.length < minStringLength) {
            setName({value: name.value, error: true})
            ok = false;
        }

        if (surname.value.length < minStringLength) {
            setSurname({value: surname.value, error: true})
            ok = false;
        }

        if (email.value.length < minStringLength) {
            setEmail({value: email.value, error: true})
            ok = false;
        }

        if (club.value.length < minStringLength) {
            setClub({value: club.value, error: true})
            ok = false;
        }

        if (isNaN(Date.parse(dob.value))) {
            setDob({value: dob.value, error: true})
            ok = false;
        }

        if (!terms) {
            ok = false;
        }

        if (ok) {
            // send http request to backend
        }
    }

    return (
        <div>
            <h1>Registrace na Lesempolem</h1>
            <p>
                Zde se můžeš na Lesempolem zaregistrovat. Závody se uskuteční 12. 6. 2021. Zajistíš si tím, že už tě
                budeme mít v počítači a tvoje odbavení při přidělení čísla na místě bude mnohem rychlejší. Registraci je
                možné přovést na všechny závody. Pokud stále nejsi rozhodnutý, rozklikni si další pravidla a informace o
                Lesempolem.
            </p>

            <Alert show={!props.enabled} variant={"danger"}>Registrace není možná.</Alert>

            <Form>

                <TextFormField
                    id={'name'}
                    enabled={props.enabled}
                    label={'Jméno'}
                    fieldError={name.error}
                    placeholder={'Zadejte Vaše jméno'}
                    onChange={(v) => setName({value: v, error: false,})}
                />
                <TextFormField
                    id={'surname'}
                    enabled={props.enabled}
                    label={'Příjmení'}
                    fieldError={surname.error}
                    placeholder={'Zadejte Vaše příjmení'}
                    onChange={(v) => setSurname({value: v, error: false,})}
                />
                <TextFormField
                    id={'email'}
                    enabled={props.enabled}
                    type={'email'}
                    label={'Email'}
                    fieldError={email.error}
                    placeholder={'Email'}
                    onChange={(v) => setEmail({value: v, error: false,})}
                />
                <TextFormField
                    id={'club'}
                    enabled={props.enabled}
                    label={'Klub / Bydliště'}
                    fieldError={club.error}
                    placeholder={'Zadejte klub, bydliště nebo cokoliv jiného'}
                    onChange={(v) => setClub({value: v, error: false,})}
                />
                <TextFormField
                    id={'dob'}
                    enabled={props.enabled}
                    type={'date'}
                    label={'Datum narození:'}
                    fieldError={dob.error}
                    placeholder={''}
                    onChange={(v) => setDob({value: v, error: false,})}
                />

                <SelectFormField
                    id={'gender'}
                    enabled={props.enabled}
                    label={'Pohlaví'}
                    options={[
                        {value: 'm', label: 'Muž'},
                        {value: 'f', label: 'Žena'},
                    ]}
                    onChange={setGender}
                />

                <CheckboxFormField
                    id={'agree'}
                    label={
                    <>
                        Souhlasím s <a href={Address.rules} target={"_blank"} rel="noreferrer">podmínkami registrace</a>
                    </>}
                    checked={true}
                    onChange={(v) => setTerms(v)}
                />

                <Button disabled={!props.enabled} variant="success" size={'lg'} type="submit" onClick={registrationFormSubmitted}>
                    Provést registraci
                </Button>
            </Form>
            <div className="break"/>
        </div>
    )
}


