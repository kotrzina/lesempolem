<?php

namespace Lesempolem\Model\Service;

use Latte\Engine;
use Lesempolem\Model\Constant\BankAccount;
use Lesempolem\Model\QrGenerator;
use Nette\Mail\Message;
use Nette\Mail\SmtpException;
use Nette\Mail\SmtpMailer;

class EmailService
{

    private const BCC_EMAIL = 'kozak@talko.cz';

    /**
     * @param string $email
     * @param string $name
     * @param string $surname
     * @param int $price
     * @param int $variableSymbol
     * @throws \rikudou\CzQrPayment\QrPaymentException
     */
    public function sendConfirmation(
        string $email,
        string $name,
        string $surname,
        int $price,
        int $variableSymbol
    ): void
    {
        $vars = [
            'name' => $name,
            'surname' => $surname,
            'email' => $email,
            'price' => $price,
            'hasPayment' => $price > 0,
            'accountNumber' => BankAccount::ACCOUNT_NUMBER,
            'bankCode' => BankAccount::BANK_CODE,
            'vs' => $variableSymbol,
        ];
        $latte = new Engine();
        $latte->setTempDirectory(__DIR__ . '/../../../temp');
        $rendered = $latte->renderToString(__DIR__ . '/../../templates/email/confirmation.latte', $vars);

        $mail = new Message;
        $mail->setFrom('Lesempolem <lesempolem@gmail.com>')
            ->addTo($email)
            ->addBcc(self::BCC_EMAIL)
            ->setSubject('Registrace na Lesempolem 2020')
            ->setHtmlBody($rendered);

        if ($price > 0) {
            $qr = QrGenerator::generateQr($variableSymbol, $price);
            $path = \stream_get_meta_data($qr)['uri'];
            $qrContent = \file_get_contents($path);
            if ($qrContent === false) {
                throw new \Exception('Could not read QR resource.');
            }
            $mail->addAttachment('lesempolem_qr.png', $qrContent);
            \fclose($qr);
        }


        try {
            $mailer = $this->loadMailer();
            $mailer->send($mail);
        } catch (SmtpException $e) {
            throw $e;
        }
    }

    private function loadMailer(): SmtpMailer
    {
        return new SmtpMailer([
            'host' => 'smtp.gmail.com',
            'username' => 'lesempolem@gmail.com',
            'password' => \getenv('SMTP_PASSWORD'),
            'port' => 465,
            'secure' => 'ssl',
        ]);
    }

}