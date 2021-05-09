<?php

declare(strict_types=1);

namespace Lesempolem\Model\Storage;

use Lesempolem\Model\Entity\Racer;

interface IStorage {

    /** @return Racer[] */
    public function getAll(): array;

    public function insert(Racer $racer): void;

}