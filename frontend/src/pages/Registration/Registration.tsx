import {FC, useEffect, useState} from "react";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {RegistrationForm} from "./RegistrationForm/RegistrationForm";
import {Registered} from "./Registered/Registered";
import {fetchRegisteredRacers, Racer} from "../../api/backend";
import './Registration.css'
import {Button} from "react-bootstrap";
import {LpDate} from "../../components/Date/LpDate";
import address from "../../Address";

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
            <h1>Registrace</h1>


            <p hidden={true}>
                Předběžná registrace na Lesempolem, které se uskuteční <LpDate type={"lp"} format={"short"}/>
                , je k dispozici na stránkách OBL.
                Pokud stále nejsi rozhodnutý, rozklikni si další pravidla a informace o Lesempolem.
            </p>

            <h2>Borák - Lesepolem za tvarůžkem</h2>
            <p>
                <p>
                    Ultramaraton Borák - Lesempolem - závod Ultracupu 2024, který proběhne na trati Lesempolem
                    11.&nbsp;5.&nbsp;2024
                </p>
                <Button
                    href={address.borak}
                    target={"_blank"}
                    variant={"success"}
                >
                    Registrace na Borák
                </Button>
            </p>

            <h2>Lesempolem</h2>
            <p>
                Tento rok už Lesempolem proběhlo. Díky a uvidíme se příští rok!
            </p>

            {false && <RegistrationForm enabled={props.enabled} refreshFn={refreshRacers}/>}
            {false && <Registered loading={loading} racers={racers}/>}
        </>
    )

}


