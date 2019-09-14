<?php

require __DIR__ . '/../vendor/autoload.php';

if (!class_exists('Tester\Assert')) {
    echo "Install Nette Tester using `composer update --dev`\n";
    exit(1);
}

if (!is_dir(__DIR__ . "/../temp/data")) {
    mkdir(__DIR__ . "/../temp/data");
}

Tester\Environment::setup();

$configurator = new Nette\Configurator;
$configurator->setDebugMode(FALSE);
$configurator->setTempDirectory(__DIR__ . '/../temp');
$configurator->createRobotLoader()
    ->addDirectory(__DIR__ . '/../app')
    ->register();

$configurator->addConfig(__DIR__ . '/../app/config/registration.neon');
$configurator->addConfig(__DIR__ . '/../app/config/config.params.php');
$configurator->addConfig(__DIR__ . '/../app/config/config.neon');
return $configurator->createContainer();
