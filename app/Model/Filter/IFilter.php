<?php

namespace Lesempolem\Model\Filter;

use Lesempolem\Model\Entity\Racer;

interface IFilter
{

	/**
	 * @param Racer[] $data
	 * @return array
	 */
	public function filter(array $data): array ;

}