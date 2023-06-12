import {FC, useEffect, useState} from "react";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
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
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        // refreshRacers()
    }, [])

    async function refreshRacers() {
        setLoading(true)
        const racers = await fetchRegisteredRacers()
        setRacers(racers)
        setLoading(false)
    }

    return (
        <>
            <RegistrationForm enabled={props.enabled} refreshFn={refreshRacers}/>
            {false && <Registered loading={loading} racers={racers}/>}
        </>
    )

}


