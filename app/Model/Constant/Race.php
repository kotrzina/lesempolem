<?php

namespace Lesempolem\Model\Constant;

abstract class Race
{

    public const
        ULTRAMARATHON = 'ultramarathon',
        MARATHON = 'marathon',
        HALFMARATHON = 'halfmarathon',
        JUNIORS = 'juniors',
        CHILD = 'child';

    public static function getRaces()
    {
        return [
            self::ULTRAMARATHON => 'Ultramaraton (MČR) - 63 km',
            self::MARATHON => 'Maraton - 42 km',
            self::HALFMARATHON => 'Půlmaraton (OBL) - 21 km',
            self::JUNIORS => 'Junioři / Juniorky / Příchozí - 5 km',
            self::CHILD => 'Děti',
        ];
    }

    public static function getRaceById(int $id): string
    {
        $races = self::getRaces();
        if (!isset($races[$id])) {
            throw new \Exception('Invalid race ID');
        }

        return $races['id'];
    }
}