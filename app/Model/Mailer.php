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