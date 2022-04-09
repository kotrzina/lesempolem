import {FC, useEffect, useState} from "react";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import * as React from "react";
import {RegistrationForm} from "./RegistrationForm/RegistrationForm";
import {Registered} from "./Registered/Registered";
import {fetchRegisteredRacers, Racer} from "../../api/backend";
import './Registration.css'

interface Props {
    enabled: boolean
}

export const Registration: FC<Props> = (props) => {

    useDocumentTitle("Registrace závodníků")

    const [racers, setRacers] = useState<Array<Racer>>([])

    useEffect(() => {
        refreshRacers()
    }, [])

    async function refreshRacers() {
        const racers = await fetchRegisteredRacers()
        setRacers(racers)
    }

    return (
        <>
            <RegistrationForm enabled={props.enabled} refreshFn={refreshRacers}/>
            <Registered racers={racers}/>
        </>
    )

}


