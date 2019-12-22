<?php

namespace Lesempolem\Model\Service;

use DateTimeImmutable;
use Exception;

class ConfigService
{
    /**
     * @var DateTimeImmutable
     */
    private DateTimeImmutable $lastPaymentDay;

    /**
     * @var DateTimeImmutable
     */
    private DateTimeImmutable $lastRegistrationDay;

    /**
     * RegistrationService constructor.
     * @param string $lastPaymentDay
     * @param string $lastRegistrationDay
     * @throws Exception
     */
    public function __construct($lastPaymentDay, $lastRegistrationDay)
    {
        $this->lastPaymentDay = new DateTimeImmutable($lastPaymentDay);
        $this->lastRegistrationDay = new DateTimeImmutable($lastRegistrationDay);
    }

    /**
     * Returns true, if registration is still enabled
     * @return bool
     * @throws Exception
     */
    public function isRegistrationEnabled()
    {
        $now = new DateTimeImmutable();
        $interval = $now->diff($this->lastRegistrationDay);
        if ($now <= $this->lastRegistrationDay || $interval->days === 0) {
            return true;
        }

        return false;
    }

}