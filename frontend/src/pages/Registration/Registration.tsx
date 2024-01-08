import {FC, useEffect, useState} from "react";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {RegistrationForm} from "./RegistrationForm/RegistrationForm";
import {Registered} from "./Registered/Registered";
import {fetchRegisteredRacers, Racer} from "../../api/backend";
import './Registration.css'
import {LpDate} from "../../components/Date/LpDate";

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
            <h1>Registrace na Lesempolem</h1>
            <p>
                Předběžná registrace na Lesempolem, které se uskuteční <LpDate type={"lp"} format={"short"}/>
                , <strong>bude</strong> k
                dispozici na stránkách OBL.
                Pokud stále nejsi rozhodnutý, rozklikni si další pravidla a informace o Lesempolem.
            </p>
            {false && <RegistrationForm enabled={props.enabled} refreshFn={refreshRacers}/>}
            {false && <Registered loading={loading} racers={racers}/>}
        </>
    )

}


