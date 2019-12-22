<?php

namespace Lesempolem\Model\Constant;

abstract class Payment
{

    public static function getRacePrice(string $race): int
    {
        switch ($race) {
            case Race::ULTRAMARATHON:
            case Race::MARATHON:
                return 400;
            case Race::HALFMARATHON:
                return 200;
        }

        return 0;
    }

}