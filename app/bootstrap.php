<?php

require __DIR__ . '/../vendor/autoload.php';

$debug = false;
if (\getenv('ENV') === 'dev') {
	$debug = true;
}

$configurator = new Nette\Configurator;

$configurator->setDebugMode($debug);
$configurator->enableDebugger(__DIR__ . '/../log');

$configurator->setTempDirectory(__DIR__ . '/../temp');

$configurator->addConfig(__DIR__ . "/config/config.params.php");
$configurator->addConfig(__DIR__ . '/config/registration.neon');
$configurator->addConfig(__DIR__ . '/config/config.neon');


$container = $configurator->createContainer();


return $container;
