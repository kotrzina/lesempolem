<?php

namespace Lesempolem\Model;


use Latte\Engine;
use Nette\Mail\Message;
use Nette\Mail\SmtpMailer;

class Mailer
{

	/** @var SmtpMailer */
	private $mailer;

	/** @var \Nette\Http\Request */
	private $httpRequest;

	/**
	 * @param string $host
	 * @param int $port
	 * @param string $username
	 * @param string $password
	 * @param string $secure
	 * @param \Nette\Http\Request $httpRequest
	 */
	public function __construct(string $host, int $port, string $username, string $password, string $secure, \Nette\Http\Request $httpRequest)
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


	public function test(): void
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