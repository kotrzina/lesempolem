<?php

declare(strict_types=1);

namespace Lesempolem;

use Nette\Bootstrap\Configurator;

final class Bootstrap
{

    public static function boot(): \Nette\DI\Container
    {
        $debug = false;
        if (\getenv('ENV') === 'dev') {
            $debug = true;
        }

        $configurator = new Configurator();

        $configurator->setDebugMode($debug);
        $configurator->enableDebugger(__DIR__ . '/../log');

        $configurator->setTempDirectory(__DIR__ . '/../temp');

        $configurator->addConfig(__DIR__ . "/config/config.params.php");
        $configurator->addConfig(__DIR__ . '/config/registration.neon');
        $configurator->addConfig(__DIR__ . '/config/config.neon');
        $configurator->addParameters([
            'dataDir' => __DIR__ . '/../dd',
        ]);
        return $configurator->createContainer();
    }

}





