import {FC, useState} from "react";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import * as React from "react";
import {Racer, registerRacer} from "../../../api/backend";
import Address from "../../../Address";
import {TextFormField} from "../TextFormField/TextFormField";
import {CheckboxFormField} from "../CheckboxFormField/CheckboxFormField";
import {SelectFormField} from "../SelectFormField/SelectFormField";
import {Break} from "../../../components/Break/Break";

interface Props {
    enabled: boolean;

    refreshFn(): void;
}

export const RegistrationForm: FC<Props> = (props) => {

    interface TextInputState {
        value: string;
        error: boolean;
    }

    interface FlashState {
        type: "success" | "danger"
        message: string;
    }

    const defaultTextInputState = {value: '', error: false,};

    type genderType = 'm' | 'f'; // male, female
    const [name, setName] = useState<TextInputState>(defaultTextInputState)
    const [surname, setSurname] = useState<TextInputState>(defaultTextInputState)
    const [email, setEmail] = useState<TextInputState>(defaultTextInputState)
    const [club, setClub] = useState<TextInputState>(defaultTextInputState)
    const [dob, setDob] = useState<TextInputState>(defaultTextInputState)
    const [gender, setGender] = useState<genderType>('m')
    const [terms, setTerms] = useState<boolean>(true)

    const [flash, setFlash] = useState<FlashState>({message: "", type: "success"})

    function updateGender(v: string) {
        if (v === "m" || v === "f") {
            setGender(v)
        }
    }

    function resetForm() {
        setName(defaultTextInputState)
        setSurname(defaultTextInputState)
        setEmail(defaultTextInputState)
        setClub(defaultTextInputState)
        setDob(defaultTextInputState)
        setGender('m')
    }

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
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!email.value.match(validRegex)) {
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
            const racer: Racer = {
                firstname: name.value,
                lastname: surname.value,
                email: email.value,
                club: club.value,
                born: new Date(dob.value),
                gender: gender,
            }
            registerRacer(racer)
                .then(() => {
                        const msg = `${racer.firstname} ${racer.lastname} zaregistrován(a). Budeme se těšit!`
                        setFlash({message: msg, type: "success"})
                        props.refreshFn() // refresh list of registered racers
                        resetForm()
                    }
                )
                .catch(() => {
                        const msg = `Zdá se, že registrace nefunguje. Zkus to prosím později.`
                        setFlash({message: msg, type: "danger"})
                    }
                )
        }
    }

    return (
        <Row>
            <Col md={12}>
                <h1>Registrace na Lesempolem</h1>
                <p>
                    Zde se můžeš na Lesempolem zaregistrovat. Závody se uskuteční 12. 6. 2021. Zajistíš si tím, že už tě
                    budeme mít v počítači a tvoje odbavení při přidělení čísla na místě bude mnohem rychlejší.
                    Registraci je
                    možné přovést na všechny závody. Pokud stále nejsi rozhodnutý, rozklikni si další pravidla a
                    informace o
                    Lesempolem.
                </p>

                <Alert show={!props.enabled} variant={"danger"}>Registrace není možná.</Alert>

                <Alert show={flash.message !== ""} variant={flash.type}>{flash.message}</Alert>

                <Form>

                    <TextFormField
                        id={'name'}
                        value={name.value}
                        enabled={props.enabled}
                        type={'text'}
                        label={'Jméno'}
                        fieldError={name.error}
                        placeholder={'Zadejte tvoje jméno'}
                        onChange={(v) => setName({value: v, error: false,})}
                    />
                    <TextFormField
                        id={'surname'}
                        value={surname.value}
                        enabled={props.enabled}
                        type={'text'}
                        label={'Příjmení'}
                        fieldError={surname.error}
                        placeholder={'Zadejte tvoje příjmení'}
                        onChange={(v) => setSurname({value: v, error: false,})}
                    />
                    <TextFormField
                        id={'email'}
                        value={email.value}
                        enabled={props.enabled}
                        type={'email'}
                        label={'Email'}
                        fieldError={email.error}
                        placeholder={'Kontaktní email'}
                        onChange={(v) => setEmail({value: v, error: false,})}
                    />
                    <TextFormField
                        id={'club'}
                        value={club.value}
                        enabled={props.enabled}
                        type={'text'}
                        label={'Klub / Bydliště'}
                        fieldError={club.error}
                        placeholder={'Zadejte klub, bydliště nebo cokoliv jiného'}
                        onChange={(v) => setClub({value: v, error: false,})}
                    />
                    <TextFormField
                        id={'dob'}
                        value={dob.value}
                        enabled={props.enabled}
                        type={'date'}
                        label={'Datum narození:'}
                        fieldError={dob.error}
                        placeholder={''}
                        onChange={(v) => setDob({value: v, error: false,})}
                    />

                    <SelectFormField
                        id={'gender'}
                        value={gender}
                        enabled={props.enabled}
                        label={'Pohlaví'}
                        options={[
                            {value: 'm', label: 'Muž'},
                            {value: 'f', label: 'Žena'},
                        ]}
                        onChange={updateGender}
                    />

                    <CheckboxFormField
                        id={'agree'}
                        label={
                            <>
                                Souhlasím s <a href={Address.rules} target={"_blank"} rel="noreferrer">podmínkami
                                registrace</a>
                            </>}
                        checked={true}
                        onChange={(v) => setTerms(v)}
                    />

                    <Button disabled={!props.enabled} variant="success" size={'lg'} type="submit"
                            onClick={e => {
                                e.preventDefault()
                                registrationFormSubmitted()
                            }}>
                        Provést registraci
                    </Button>
                </Form>
                <Break size={16}/>
            </Col>
        </Row>
    )
}


