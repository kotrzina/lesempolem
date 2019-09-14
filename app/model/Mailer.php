<?php

namespace Lesempolem;


use Latte\Engine;
use Lesempolem\Constant\BankAccount;
use Lesempolem\Entity\Payment;
use Nette\Mail\Message;
use Nette\Mail\SendmailMailer;
use Nette\Mail\SmtpMailer;
use Nette\Utils\DateTime;

class Mailer
{

	/** @var SmtpMailer */
	private $mailer;

	/** @var \Nette\Http\Request */
	private $httpRequest;

	/**
	 * Mailer constructor.
	 * @param $host
	 * @param $port
	 * @param $username
	 * @param $password
	 * @param $secure
	 * @param \Nette\Http\Request $httpRequest
	 */
	public function __construct($host, $port, $username, $password, $secure, \Nette\Http\Request $httpRequest)
	{
		$this->mailer = new SmtpMailer([
			'host' => $host,
			'port' => $port,
			'username' => $username,
			'password' => $password,
			'secure' => $secure,
		]);
		$this->httpRequest = $httpRequest;
	}


	public function unknownIncome($transaction_id, $variable_symbol, $amount)
	{
		$latte = new Engine;
		$params = [
			'variable_symbol' => $variable_symbol,
			'amount' => $amount,
			'transaction_id' => $transaction_id,
		];

		$mail = new Message();
		$mail->setFrom('Lesempolem <lesempolem@gmail.com>')
			->addTo('lesempolem@gmail.com')
			->setSubject("Lesempolem - neznámá platba")
			->setHtmlBody($latte->renderToString(__DIR__ . "/../templates/email/admin_unknown_income.latte", $params));

		$this->mailer->send($mail);
	}

	public function badAmountIncome(Payment $payment, $transaction_id, $variable_symbol, $amount)
	{
		$latte = new Engine;
		$params = [
			'payment' => $payment,
			'variable_symbol' => $variable_symbol,
			'amount' => $amount,
			'transaction_id' => $transaction_id,
		];

		$mail = new Message();
		$mail->setFrom('Lesempolem <lesempolem@gmail.com>')
			->addTo('lesempolem@gmail.com')
			->setSubject("Lesempolem - špatná platba")
			->setHtmlBody($latte->renderToString(__DIR__ . "/../templates/email/admin_bad_amount_income.latte", $params));

		$this->mailer->send($mail);
	}

	public function successfulIncome(Payment $payment, $transaction_id, $variable_symbol, $amount)
	{
		$latte = new Engine;
		$params = [
			'payment' => $payment,
			'variable_symbol' => $variable_symbol,
			'amount' => $amount,
			'transaction_id' => $transaction_id,
		];

		$mailAdmin = new Message();
		$mailAdmin->setFrom('Lesempolem <lesempolem@gmail.com>')
			->addTo('lesempolem@gmail.com')
			->setSubject("Lesempolem - potvrzení platby")
			->setHtmlBody($latte->renderToString(__DIR__ . "/../templates/email/admin_successful_income.latte", $params));
		$this->mailer->send($mailAdmin);

		$mail = new Message();
		$mail->setFrom('Lesempolem <lesempolem@gmail.com>')
			->addTo($payment->getEmail())
			->setSubject("Lesempolem - potvrzení platby")
			->setHtmlBody($latte->renderToString(__DIR__ . "/../templates/email/successful_income.latte", $params));
		$this->mailer->send($mail);
	}

	public function warning(Payment $payment)
	{
		$latte = new Engine;
		$title = "Lesempolem - nezaplacené startovné";
		$params = [
			'payment' => $payment,
			'variable_symbol' => $payment->getVariableSymbol(),
			'amount' => $payment->getTotalPrice(),
			'accountNumber' => BankAccount::ACCOUNT_NUMBER,
			'bankCode' => BankAccount::BANK_CODE,
		];

		$mailAdmin = new Message();
		$mailAdmin->setFrom('Lesempolem <lesempolem@gmail.com>')
			->addTo('lesempolem@gmail.com')
			->setSubject($title)
			->setHtmlBody($latte->renderToString(__DIR__ . "/../templates/email/admin_warning.latte", $params));
		$this->mailer->send($mailAdmin);

		$mail = new Message();
		$mail->setFrom('Lesempolem <lesempolem@gmail.com>')
			->addTo($payment->getEmail())
			->setSubject($title)
			->setHtmlBody($latte->renderToString(__DIR__ . "/../templates/email/warning.latte", $params));
		$this->mailer->send($mail);
	}

	public function delete(Payment $payment)
	{
		$latte = new Engine;
		$title = "Lesempolem - zrušení registrace";
		$params = [
			'payment' => $payment,
			'variable_symbol' => $payment->getVariableSymbol(),
			'amount' => $payment->getTotalPrice(),
		];

		$mailAdmin = new Message();
		$mailAdmin->setFrom('Lesempolem <lesempolem@gmail.com>')
			->addTo('lesempolem@gmail.com')
			->setSubject($title)
			->setHtmlBody($latte->renderToString(__DIR__ . "/../templates/email/admin_delete.latte", $params));
		$this->mailer->send($mailAdmin);

		$mail = new Message();
		$mail->setFrom('Lesempolem <lesempolem@gmail.com>')
			->addTo($payment->getEmail())
			->setSubject($title)
			->setHtmlBody($latte->renderToString(__DIR__ . "/../templates/email/delete.latte", $params));
		$this->mailer->send($mail);
	}

	public function alert(Payment $payment)
	{
		$latte = new Engine;
		$title = "Lesempolem - nezaplacené startovné";
		$params = [
			'payment' => $payment,
			'variable_symbol' => $payment->getVariableSymbol(),
			'amount' => $payment->getTotalPrice(),
			'accountNumber' => BankAccount::ACCOUNT_NUMBER,
			'bankCode' => BankAccount::BANK_CODE,
		];

		$mail = new Message();
		$mail->setFrom('Lesempolem <lesempolem@gmail.com>')
			->addTo($payment->getEmail())
			//->addTo('kozak@talko.cz')
			->setSubject($title)
			->setHtmlBody($latte->renderToString(__DIR__ . "/../templates/email/alert.latte", $params));
		$this->mailer->send($mail);
	}

	public function test()
	{
		$params = [];
		$latte = new Engine;
		$mail = new Message();
		$mail->setFrom('Lesempolem <lesempolem@gmail.com>')
			->addTo('kozak@talko.cz')
			->setSubject("Lesempolem - testovací email")
			->setHtmlBody($latte->renderToString(__DIR__ . "/../templates/email/test.latte", $params));
		$this->mailer->send($mail);
	}
}