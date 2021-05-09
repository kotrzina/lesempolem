<?php

declare(strict_types=1);

use Lesempolem\Model\Entity\Racer;
use Lesempolem\Model\Storage\FileStorage;
use Tester\Assert;
use Tester\TestCase;

require __DIR__ . "/../../bootstrap.php";

class FileStorageTests extends TestCase
{
    public function testTime()
    {
        $path = __DIR__ . DIRECTORY_SEPARATOR . 'testdir';
        $filename = 'test.json';
        $storage = new FileStorage($path, $filename);

        $now = (new DateTimeImmutable())->format('Y-m-d H:i:s');
        $storage->insert(new Racer('Martin', 'Chodur', 'fusakla@seznam.cz', 'Krno', '2014/05/19', 'm', $now));
        $storage->insert(new Racer('Tomas', 'Kozakova', 'kozak@seznam.cz', 'Ves', '2017/05/19', 'f', $now));


        $racers = $storage->getAll();

        Assert::equal(2, count($racers));

        Assert::equal('Martin', $racers[0]->getName());
        Assert::equal('Chodur', $racers[0]->getSurname());
        Assert::equal('fusakla@seznam.cz', $racers[0]->getEmail());
        Assert::equal('Krno', $racers[0]->getClub());
        Assert::equal('2014/05/19', $racers[0]->getDob());
        Assert::equal('m', $racers[0]->getGender());
        Assert::equal('Tomas', $racers[1]->getName());

        unlink($path . DIRECTORY_SEPARATOR . $filename);
    }

}

(new FileStorageTests())->run();