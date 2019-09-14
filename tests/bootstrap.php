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