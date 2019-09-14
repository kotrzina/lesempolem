<?php

namespace Lesempolem\Model\Service;


class RegistrationService
{
	/**
	 * @var \DateTime
	 */
	private $lastPaymentDay;

	/**
	 * @var \DateTime
	 */
	private $lastRegistrationDay;

	/**
	 * RegistrationService constructor.
	 * @param string $lastPaymentDay
	 * @param string $lastRegistrationDay
	 */
	public function __construct($lastPaymentDay, $lastRegistrationDay)
	{
		$this->lastPaymentDay = new \DateTime($lastPaymentDay);
		$this->lastRegistrationDay = new \DateTime($lastRegistrationDay);
	}

	/**
	 * Returns true, if registration is still enabled
	 * @return bool
	 */
	public function isRegistrationEnabled()
	{
		$now = new \DateTime();
		$interval = $now->diff($this->lastRegistrationDay);
		if ($now <= $this->lastRegistrationDay || $interval->days === 0) {
			return true;
		}

		return false;
	}

}