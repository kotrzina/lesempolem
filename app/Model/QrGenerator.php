<?php

declare(strict_types=1);

namespace Lesempolem\Model;

use Lesempolem\Model\Constant\BankAccount;
use rikudou\CzQrPayment\QrPayment;
use rikudou\CzQrPayment\QrPaymentException;
use rikudou\CzQrPayment\QrPaymentOptions;

class QrGenerator
{

    /**
     * @param int $vs
     * @param int $price
     * @return resource
     * @throws QrPaymentException
     */
    public static function generateQr(int $vs, int $price)
    {
        $file = tmpfile();
        if ($file === false) {
            throw new \Exception('Could not create tmp file.');
        }

        try {
            $payment = new QrPayment(BankAccount::ACCOUNT_NUMBER, BankAccount::BANK_CODE, [
                QrPaymentOptions::VARIABLE_SYMBOL => $vs,
                QrPaymentOptions::AMOUNT => $price,
                QrPaymentOptions::CURRENCY => "CZK",
            ]);
            \fputs($file, $payment->getQrImage()->writeString());
        } catch (QrPaymentException $exception) {
            throw $exception;
        }

        return $file;
    }

}