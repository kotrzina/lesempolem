<?php

namespace Lesempolem\Filter;

interface IFilter
{

	/**
	 * @param array $data
	 * @return array
	 */
	public function filter(array $data);

}