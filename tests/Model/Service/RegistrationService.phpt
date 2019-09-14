<?php

use Lesempolem\Model\Service\RegistrationService;
use Tester\Assert;
use Tester\TestCase;

require __DIR__ . "/../../bootstrap.php";

class RegistrationServiceTests extends TestCase
{

	public function testIsRegistrationEnabled()
	{
		$yesterday = new DateTime();
		$yesterday->sub(new DateInterval('P1D'));
		$tomorrow = new DateTime();
		$tomorrow->add(new DateInterval('P1D'));
		$now = new \DateTime();

		$service = new RegistrationService($yesterday->format("Y/m/d"), $yesterday->format("Y/m/d"));
		Assert::false($service->isRegistrationEnabled());


		$service = new RegistrationService($tomorrow->format("Y/m/d"), $tomorrow->format("Y/m/d"));
		Assert::true($service->isRegistrationEnabled());


		$service = new RegistrationService($now->format("Y/m/d"), $now->format("Y/m/d"));
		Assert::true($service->isRegistrationEnabled());
	}

}

(new RegistrationServiceTests())->run();
