import {FC} from "react";
import {Alert} from "react-bootstrap";

export const TrackAlert: FC = () => {
    return (
        <Alert variant="danger">
            <Alert.Heading>Pozor!</Alert.Heading>
            <p>
                Tato stránka zobrazuje zastaralou trať z roku 2021. Neočekavají se velké změny a je i dost
                pravděpodobné, že trať zůstane beze změny. Bohužel to v tento okamžik garantovat nedokážeme.
            </p>
            <hr/>
            <p className="mb-0">
                Tato stránka včetně informací o trati bude včas aktualizována.
            </p>
        </Alert>
    );
};
