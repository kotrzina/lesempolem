import {FC} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import './ResultList.css'
import Address from "../../Address";
import {useDocumentTitle} from "../../hooks/useDocumentTitle";

type Props = {
    years: string[];
};

export const ResultList: FC<Props> = (props: Props) => {

    useDocumentTitle("Výsledky závodů Lesempolem")

    const navigate = useNavigate();

    function goto(year: string): void {
        const address = Address.resultsPlaceholder.replace(':year', year.toString())
        navigate(address)
    }

    function getRaceTitle(year: string): string {
        if (year === '2024-borak') {
            return 'Borák 2024'
        }

        return year
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
                            {getRaceTitle(year)}
                        </Button>
                    </Col>
                ))}
            </Row>
        </>
    );
};
