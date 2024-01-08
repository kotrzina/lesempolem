import {FC, useState} from "react";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
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

    const RegReady = "Provést registraci"
    const RegWorking = "..."
    const RegSuccess = "Zaregistrován!"

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
    type raceType = '63km' | '42km' | '21km';
    const [name, setName] = useState<TextInputState>(defaultTextInputState)
    const [surname, setSurname] = useState<TextInputState>(defaultTextInputState)
    const [email, setEmail] = useState<TextInputState>(defaultTextInputState)
    const [club, setClub] = useState<TextInputState>(defaultTextInputState)
    const [dob, setDob] = useState<TextInputState>(defaultTextInputState)
    const [gender, setGender] = useState<genderType>('m')
    const [race, setRace] = useState<raceType>('63km')
    const [terms, setTerms] = useState<boolean>(true)

    // flash message
    const [flash, setFlash] = useState<FlashState>({message: "", type: "success"})

    // button
    const [registerText, setRegisterText] = useState<string>(RegReady)

    function onGender(v: string) {
        if (v === "m" || v === "f") {
            setGender(v)
        }
    }

    function onRace(v: string) {
        if (v === "63km" || v === "42km" || v === "21km") {
            setRace(v)
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
        if (name.value.trim().length < minStringLength) {
            setName({value: name.value, error: true})
            ok = false;
        }

        if (surname.value.trim().length < minStringLength) {
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

        if (club.value.trim().length < minStringLength) {
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
            setRegisterText(RegWorking)
            const racer: Racer = {
                firstname: name.value.trim(),
                lastname: surname.value.trim(),
                email: email.value.trim(),
                club: club.value.trim(),
                born: new Date(dob.value),
                gender: gender,
                race: race,
            }
            registerRacer(racer)
                .then(() => {
                        const msg = `🏃🏃🏃 ${racer.firstname} ${racer.lastname} zaregistrován(a). Budeme se těšit!`
                        setFlash({message: msg, type: "success"})
                        props.refreshFn() // refresh list of registered racers
                        setRegisterText(RegSuccess)
                        setInterval(() => {
                            setRegisterText(RegReady)
                        }, 5000)
                        resetForm()
                    }
                )
                .catch(() => {
                        const msg = `Zdá se, že registrace nefunguje. Zkus to prosím později.`
                        setFlash({message: msg, type: "danger"})
                    }
                )
                .finally(() => {
                    window.scrollTo(0, 0)
                })
        }
    }

    return (
        <Row>
            <Col md={12}>
                <Alert show={!props.enabled} variant={"danger"}>Registrace není možná.</Alert>

                <Alert show={flash.message !== ""} variant={flash.type}>
                    <strong>{flash.message}</strong>
                </Alert>

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
                        onChange={(v) => setEmail({value: v.trim(), error: false,})}
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
                        onChange={onGender}
                    />

                    <SelectFormField
                        id={'race'}
                        value={race}
                        enabled={props.enabled}
                        label={'Závod'}
                        options={[
                            {value: '63km', label: 'MČR Ultramaraton - 63 km'},
                            {value: '42km', label: 'Maraton - 42 km'},
                            {value: '21km', label: 'Půlmaraton - 21 km'},
                        ]}
                        onChange={onRace}
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

                    <Button style={{width: "190px", backgroundColor: "#289c4a"}}
                            disabled={!props.enabled}
                            size={'lg'}
                            type="submit"
                            onClick={e => {
                                e.preventDefault()
                                registrationFormSubmitted()
                            }}>
                        {registerText}
                    </Button>

                </Form>
                <Break size={4}/>
            </Col>
        </Row>
    )
}


