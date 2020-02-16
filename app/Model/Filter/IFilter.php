<?php

namespace Lesempolem\Model\Filter;

interface IFilter
{

	/**
	 * @param array $data
	 * @return array
	 */
	public function filter(array $data): array ;

}