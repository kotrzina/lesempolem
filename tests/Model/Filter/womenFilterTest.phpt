<?php


require __DIR__ . "/../../bootstrap.php";

$data = [
    0 => [
        'id' => 1,
        'sex' => 0,
        'deleted' => 0
    ],
    1 => [
        'id' => 2,
        'sex' => 1,
        'deleted' => 0
    ],
    2 => [
        'id' => 3,
        'sex' => 0,
        'deleted' => 1
    ],
    3 => [
        'id' => 4,
        'sex' => 1,
        'deleted' => 1
    ],
];

$expected = [
    1 => [
        'id' => 2,
        'sex' => 1,
        'deleted' => 0
    ],
    3 => [
        'id' => 4,
        'sex' => 1,
        'deleted' => 1
    ],
];

$filter = new \Lesempolem\Filter\WomenFilter();
\Tester\Assert::same($expected, $filter->filter($data));