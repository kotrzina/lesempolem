<?php

use Lesempolem\Model\TimeFormatter;
use Tester\Assert;
use Tester\TestCase;

require __DIR__ . "/../bootstrap.php";

class TimeFormatterTests extends TestCase
{
    public function testTime()
    {
        Assert::equal('00:00:56', TimeFormatter::time(56));
        Assert::equal('00:01:04', TimeFormatter::time(64));
        Assert::equal('00:01:00', TimeFormatter::time(60));
        Assert::equal('03:34:10', TimeFormatter::time(12850));
    }

    public function testTimeBehind()
    {
        Assert::equal('+ 56s', TimeFormatter::time_behind(56));
        Assert::equal('+ 1m 4s', TimeFormatter::time_behind(64));
        Assert::equal('+ 1m', TimeFormatter::time_behind(60));
        Assert::equal('+ 3h 34m 10s', TimeFormatter::time_behind(12850));
    }
}

(new TimeFormatterTests())
    ->run();