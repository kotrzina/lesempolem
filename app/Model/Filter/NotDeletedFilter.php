<?php

declare(strict_types=1);

namespace Lesempolem\Model\Filter;

class NotDeletedFilter implements IFilter
{

	/**
	 * @param array $data
	 * @return array
	 */
	public function filter(array $data): array
	{
		$data = array_filter($data, function ($item) {
			if ($item['deleted'] == 0) {
				return true;
			}
			return false;
		});

		return $data;
	}

}