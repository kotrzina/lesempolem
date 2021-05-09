<?php

declare(strict_types=1);

namespace Lesempolem\Model\Filter;

use Lesempolem\Model\Entity\Racer;

class FilterService
{

    /**
     * @param Racer[] $data
     * @param IFilter...$filters
     * @return array
     */
    public static function applyFilters(array $data,...$filters): array
    {
        foreach ($filters as $filter) {
            $data = $filter->filter($data);
        }

        return $data;
    }

}