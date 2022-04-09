import {Col, Row} from "react-bootstrap";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";
import {FC} from "react";

export const Rules: FC = () => {

    useDocumentTitle("Podmínky registrace")

    return (
        <Row>
            <Col md={12}>
                <h1>Podmínky registrace</h1>
                <p>
                    Vyplněním a odesláním registračního formuláře dává každý registrovaný spol. SH ČMS - Sbor
                    dobrovolných hasičů Veselice (IČ: 65339851) souhlas se zpracováním a využitím údajů o své osobě pro
                    účely realizace soutěže a pro marketingové účely pořadatele, a to včetně e-mailové adresy vyplněné v
                    registračním formuláři, a obrazového a video materiálu pořízeného během akce, na kterém se může
                    účastník závodu objevit, po dobu deseti let od udělení souhlasu v souladu s příslušnými ustanoveními
                    zákona č. 101/2000 Sb. (zákon o ochraně osobních údajů) v platném znění. Dále učastník souhlasí se
                    zveřejněním svého jména, příjmení a klubu (bydliště) na webových stránkách www.lesempolem.cz v
                    seznamu již zaregistrovaných osob. Pokud uživatel provádí registraci pro více účastníků, jedná tak s
                    jejich platným souhlasem o poskytnují všech zmíněných osobních údajů a na všechny registrované se
                    vztahují výše uvedené podmínky. V případě nezletilých může být registrace provedena pouze zákoným
                    zástupcem nezletilého. Účastník zároveň vyjadřuje souhlas s tím, aby údaje o jeho osobě byly v plném
                    rozsahu a k účelům výše uvedeným dále zpracovány a využity partnery SH ČMS - Sbor dobrovolných
                    hasičů Veselice. Údaje jsou účastníkem soutěže poskytovány dobrovolně a svůj souhlas s jejich
                    zpracováním může kdykoliv písemně odvolat na adrese sídla pořadatele.
                </p>
            </Col>
        </Row>

    );
};
