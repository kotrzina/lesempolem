<?php

declare(strict_types=1);

namespace Lesempolem\Model\Filter;

use Lesempolem\Model\Entity\Racer;

class MenFilter implements IFilter
{

	/**
	 * @param Racer[] $data
	 * @return array
	 */
	public function filter(array $data): array
	{
		$data = array_filter($data, function (Racer $racer) {
			if ($racer->getGender() == Racer::MALE) {
				return true;
			}
			return false;
		});

		return $data;
	}
}