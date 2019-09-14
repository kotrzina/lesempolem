<?php

namespace Lesempolem\Filter;


class MenFilter implements IFilter
{


	/**
	 * @param array $data
	 * @return array
	 */
	public function filter(array $data)
	{
		$data = array_filter($data, function ($item) {
			if ($item['sex'] == 0) {
				return true;
			}
			return false;
		});

		return $data;
	}
}