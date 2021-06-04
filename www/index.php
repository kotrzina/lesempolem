<?php

use Lesempolem\Bootstrap;
use Nette\Application\Application;

require __DIR__ . '/../vendor/autoload.php';

$container = Bootstrap::boot();

/** @var Application $application */
$application = $container->getByType(Application::class);
$application->run();


