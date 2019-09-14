<?php

namespace Lesempolem\Model;


class Environment
{

	const
		PROD = 'PROD',
		TEST = 'TEST',
		DEV = 'DEV';

	/** @var  string */
	private $environment;

	/**
	 * Environment constructor.
	 * @param string $env
	 */
	public function __construct(string $env)
	{
		$this->environment = $env;
	}

	/**
	 * Return true, if Google analytics script should be enabled
	 * @return bool
	 */
	public function isGoogleAnalyticsEnabled()
	{
		if ($this->environment === self::PROD) {
			return true;
		}

		return false;
	}

}