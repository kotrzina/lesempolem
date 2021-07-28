import * as React from 'react';
import {Table} from "react-bootstrap";
import './StartingFees.css'

type Props = {
    fees: {
        name: string;
        price: number;
        note?: string;
    }[]
};


export const StartingFee = (props: Props) => {

    let starsMain = 0;
    let starsNotes = 0;

    function getPrice(price: number, note?: string): JSX.Element {
        if (!(typeof note === 'undefined')) {
            starsMain = starsMain + 1;
            const starsString = '*'.repeat(starsMain)
            return <>{price} Kč {starsString}</>
        }

        return <>{price} Kč</>
    }

    function getNote(note?: string): JSX.Element {
        starsNotes++;
        const starsString = '*'.repeat(starsNotes);
        return <>
            <i>{starsString}&nbsp;{note}</i>
        </>
    }

    return (
        <>
            <h2>Startovné</h2>
            <p>Startovné bude hrazeno na místě v den závodu.</p>
            <Table id={'fees'}>
                {props.fees.map((fee, feeIdx) => {
                    return <tr className={'fee-' + feeIdx} key={feeIdx}>
                        <td>{fee.name}</td>
                        <td>{getPrice(fee.price, fee.note)}</td>
                    </tr>
                })}
            </Table>
            {props.fees.filter(fee => {
                return (!(typeof fee.note === 'undefined'))
            }).map((fee, feeIdx) => {
                return <p key={feeIdx}>
                    {getNote(fee.note)}
                </p>
            })}
        </>
    );
};