import {FC, useState} from "react";
import {Col, FormControl, Image, InputGroup} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import * as React from "react";

type PersonProps = {
    name: string;
    photoPath: string;
    description: string | JSX.Element
    email: string;
    phone: string;
}

export const Person: FC<PersonProps> = (props: PersonProps) => {

    const [inputEmail, setInputEmail] = useState<string>(props.email)
    const [inputPhone, setInputPhone] = useState<string>(props.phone)

    function copyEmail() {
        navigator.clipboard.writeText(props.email).then(() => {
            setInputEmail("Zkopirováno!")
            setTimeout(() => {
                setInputEmail(props.email)
            }, 2000)
        })
    }

    function copyPhone() {
        // remove spaces from phone number
        const phoneCopy = props.phone.replaceAll(' ', '')
        navigator.clipboard.writeText(phoneCopy).then(() => {
            setInputPhone("Zkopirováno!")
            setTimeout(() => {
                setInputPhone(props.phone)
            }, 2000)
        })
    }

    return (
        <Col lg={3} md={6} sm={12}>
            <div className="thumbnail">
                <Image className={'userImage'} roundedCircle src={props.photoPath} alt="Fotka Jiřího Skotáka"/>
                <div className="caption">
                    <h3>{props.name}</h3>
                    <p>{props.description}</p>
                    <div>
                        <InputGroup onClick={() => copyEmail()}>
                            <InputGroup.Text>
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                />
                            </InputGroup.Text>
                            <FormControl value={inputEmail} readOnly={true}/>
                        </InputGroup>
                        <InputGroup onClick={() => copyPhone()}>
                            <InputGroup.Text>
                                <FontAwesomeIcon
                                    icon={faPhone}
                                />
                            </InputGroup.Text>
                            <FormControl value={inputPhone} readOnly={true}/>
                        </InputGroup>
                    </div>
                </div>
            </div>
        </Col>
    )
}