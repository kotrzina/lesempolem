import {FC, useEffect, useState} from "react";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {RegistrationForm} from "./RegistrationForm/RegistrationForm";
import {Registered} from "./Registered/Registered";
import {fetchRegisteredRacers, Racer} from "../../api/backend";
import './Registration.css'
import {LpDate} from "../../components/Date/LpDate";
import {Alert} from "react-bootstrap";
import {Break} from "../../components/Break/Break";

interface Props {
    enabled: boolean
}

export const Registration: FC<Props> = (props) => {

    useDocumentTitle("Registrace závodníků")

    const [racers, setRacers] = useState<Array<Racer>>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        void refreshRacers()
    }, [])

    async function refreshRacers() {
        setLoading(true)
        try {
            const racers = await fetchRegisteredRacers()
            setRacers(racers)
        } catch (e) {
            console.error(e)
        }

        setLoading(false)
    }

    return (
        <>
            <h1>Registrace</h1>

            <p>
                Předběžná registrace na Lesempolem, které se uskuteční <LpDate type={"lp"} format={"short"}/>.
                Pokud stále nejsi rozhodnutý, rozklikni si další informace o Lesempolem.
            </p>

            {/*<p hidden={true}>*/}
            {/*    <Alert variant={"warning"}>*/}
            {/*        <strong>*/}
            {/*            Na zprovoznění online registrace usilovně pracujeme!*/}
            {/*        </strong>*/}
            {/*    </Alert>*/}

            {/*</p>*/}

            {<RegistrationForm enabled={props.enabled} refreshFn={refreshRacers}/>}
            {<Registered loading={loading} racers={racers}/>}
            <Break size={4}/>
        </>
    )

}


