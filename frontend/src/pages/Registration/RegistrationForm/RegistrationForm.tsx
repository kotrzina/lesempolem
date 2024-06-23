import {FC, useState} from "react";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
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

    interface FormState {
        name: string;
        surname: string;
        email: string;
        club: string;
        dob: string;
        gender: "m" | "f";
        race: string;
        terms: boolean;
    }

    interface FormErrorState {
        name: boolean;
        surname: boolean;
        email: boolean;
        club: boolean;
        dob: boolean;
    }


    // not exported from original package
    interface SelectOption {
        value: string;
        label: string;
    }

    const raceOptions: SelectOption[] = [
        {value: '63km', label: 'Ultramaraton - 63 km'},
        {value: '42km', label: 'Maraton - 42 km'},
        {value: '21km', label: 'Půlmaraton - 21 km'},

    ]

    interface FlashState {
        type: "success" | "danger"
        message: string;
    }

    const [form, setForm] = useState<FormState>({
        name: "",
        surname: "",
        email: "",
        club: "",
        dob: "",
        gender: "m",
        race: raceOptions[0].value, // just use the first race in the list as default
        terms: true,
    })

    const [formError, setFormError] = useState<FormErrorState>({
        name: false,
        surname: false,
        email: false,
        club: false,
        dob: false,
    })

    // flash message
    const [flash, setFlash] = useState<FlashState>({message: "", type: "success"})

    // button
    const [registerText, setRegisterText] = useState<string>(RegReady)

    function onGender(v: string) {
        if (v === "m" || v === "f") {
            setForm((prev) => {
                return {...prev, gender: v}
            })
        }
    }

    function onRace(v: string) {
        raceOptions.forEach((r) => {
            if (r.value === v) {
                setForm((prev) => {
                    return {...prev, race: v}
                })
            }
        })
    }

    function registrationFormSubmitted() {
        const minStringLength = 1;
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const errors: FormErrorState = {
            name: form.name.trim().length < minStringLength,
            surname: form.surname.trim().length < minStringLength,
            email: !form.email.match(validRegex),
            club: form.club.trim().length < minStringLength,
            dob: isNaN(Date.parse(form.dob)),
        }

        setFormError(errors)

        const ok =
            Object.values(errors).every((v) => v === false)
            && form.terms

        console.log(form)
        console.log(errors)

        if (ok) {
            // form object is ready and validated
            // just send it to the server


            // registerRacer(racer)
            //     .then(() => {
            //             const msg = `🏃🏃🏃 ${racer.firstname} ${racer.lastname} zaregistrován(a). Budeme se těšit!`
            //             setFlash({message: msg, type: "success"})
            //             props.refreshFn() // refresh list of registered racers
            //             setRegisterText(RegSuccess)
            //             setInterval(() => {
            //                 setRegisterText(RegReady)
            //             }, 5000)
            //             resetForm()
            //         }
            //     )
            //     .catch(() => {
            //             const msg = `Zdá se, že registrace nefunguje. Zkus to prosím později.`
            //             setFlash({message: msg, type: "danger"})
            //         }
            //     )
            //     .finally(() => {
            //         window.scrollTo(0, 0)
            //     })
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
                        value={form.name}
                        enabled={props.enabled}
                        type={'text'}
                        label={'Jméno'}
                        fieldError={formError.name}
                        placeholder={'Zadejte tvoje jméno'}
                        onChange={(v) => {
                            setForm((prev) => {
                                return {...prev, name: v}
                            })
                        }}
                    />
                    <TextFormField
                        id={'surname'}
                        value={form.surname}
                        enabled={props.enabled}
                        type={'text'}
                        label={'Příjmení'}
                        fieldError={formError.surname}
                        placeholder={'Zadejte tvoje příjmení'}
                        onChange={(v) => {
                            setForm((prev) => {
                                return {...prev, surname: v}
                            })
                        }}
                    />
                    <TextFormField
                        id={'email'}
                        value={form.email}
                        enabled={props.enabled}
                        type={'email'}
                        label={'Email'}
                        fieldError={formError.email}
                        placeholder={'Kontaktní email'}
                        onChange={(v) => {
                            setForm((prev) => {
                                return {...prev, email: v}
                            })
                        }}
                    />
                    <TextFormField
                        id={'club'}
                        value={form.club}
                        enabled={props.enabled}
                        type={'text'}
                        label={'Klub / Bydliště'}
                        fieldError={formError.club}
                        placeholder={'Zadejte klub, bydliště nebo cokoliv jiného'}
                        onChange={(v) => {
                            setForm((prev) => {
                                return {...prev, club: v}
                            })
                        }}
                    />
                    <TextFormField
                        id={'dob'}
                        value={form.dob}
                        enabled={props.enabled}
                        type={'date'}
                        label={'Datum narození:'}
                        fieldError={formError.dob}
                        placeholder={''}
                        onChange={(v) => {
                            setForm((prev) => {
                                return {...prev, dob: v}
                            })
                        }}
                    />

                    <SelectFormField
                        id={'gender'}
                        value={form.gender}
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
                        value={form.race}
                        enabled={props.enabled}
                        label={'Závod'}
                        options={raceOptions}
                        onChange={onRace}
                    />

                    <CheckboxFormField
                        id={'agree'}
                        label={
                            <>
                                Souhlasím s <a href={Address.rules} target={"_blank"} rel="noreferrer">podmínkami
                                registrace</a>
                            </>}
                        checked={form.terms}
                        onChange={(v) => {
                            setForm((prev) => {
                                return {...prev, terms: v}
                            })
                        }}
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
