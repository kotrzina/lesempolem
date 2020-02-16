<?php

declare(strict_types=1);

namespace Lesempolem\Model\Filter;

class WomenFilter implements IFilter
{

	/**
	 * @param array $data
	 * @return array
	 */
	public function filter(array $data): array
	{
		$data = array_filter($data, function ($item) {
			if ($item['sex'] == 1) {
				return true;
			}
			return false;
		});

		return $data;
	}

}