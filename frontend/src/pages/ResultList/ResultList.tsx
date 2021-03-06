import {FC} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import './ResultList.css'
import Address from "../../Address";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";

type Props = {
    years: number[];
};

export const ResultList: FC<Props> = (props: Props) => {

    useDocumentTitle("Výsledky závodů Lesempolem")

    const history = useHistory();

    function goto(year: number): void {
        const address = Address.resultsPlaceholder.replace(':year', year.toString())
        history.push(address)
    }

    return (
        <>
            <Row>
                <Col md={12}>
                    <h1>Výsledky závodů Lesempolem</h1>
                </Col>
            </Row>

            <Row id={'resultList'}>
                {props.years.map((year, yearIdx) => (
                    <Col md={3} key={yearIdx}>
                        <Button
                            size={'lg'}
                            variant={'success'}
                            onClick={() => goto(year)}
                        >
                            {year}
                        </Button>
                    </Col>
                ))}
            </Row>
        </>
    );
};
