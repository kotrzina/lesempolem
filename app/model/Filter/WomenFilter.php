<?php

namespace Lesempolem\Filter;


class WomenFilter implements IFilter
{

	/**
	 * @param array $data
	 * @return array
	 */
	public function filter(array $data)
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