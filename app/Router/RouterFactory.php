<?php

declare(strict_types=1);

namespace Lesempolem\Router;

use Lesempolem\Model\Environment;
use Nette,
	Nette\Application\Routers\RouteList,
	Nette\Application\Routers\Route,
	Nette\Application\Routers\SimpleRouter;


/**
 * Router factory.
 */
class RouterFactory
{

	private Environment $environment;

	/**
	 * RouterFactory constructor.
	 * @param Environment $env
	 */
	public function __construct(Environment $env)
	{
		$this->environment = $env;
	}


	public function createRouter(): RouteList
	{
		$router = new RouteList();
		$router[] = new Route('api/results', 'Api:results');


		$router[] = new Route('admin/json', 'List:json');
		$router[] = new Route('admin/seznam', 'List:table');
		$router[] = new Route('admin/formular', 'List:form');

		$router[] = new Route('', 'Homepage:default');
		$router[] = new Route('live', 'Homepage:live');
		$router[] = new Route('online', 'Homepage:online');
		$router[] = new Route('registrace.html', 'Homepage:registration');
		$router[] = new Route('validate-category', 'Homepage:validateCategory');
		$router[] = new Route('informace.html', 'Homepage:info');
		$router[] = new Route('festival.html', 'Homepage:festival');
		$router[] = new Route('trat.html', 'Homepage:trat');
		$router[] = new Route('fotogalerie.html', 'Homepage:fotogalerie');
		$router[] = new Route('kontakty.html', 'Homepage:kontakty');
		$router[] = new Route('video.html', 'Homepage:video');
		$router[] = new Route('dokonceni-registrace.html', 'Homepage:payment');
		$router[] = new Route('delete-racer', 'Homepage:removeRacer');
		$router[] = new Route('podminky.html', 'Homepage:rules');

		$router[] = new Route('vysledky.html', 'Homepage:vysledky');
		$router[] = new Route('vysledky-2013.html', 'Homepage:vysledky2013');
		$router[] = new Route('vysledky-2014.html', 'Homepage:vysledky2014');
		$router[] = new Route('vysledky-2015.html', 'Homepage:vysledky2015');
		$router[] = new Route('vysledky-2016.html', 'Homepage:vysledky2016');
		$router[] = new Route('vysledky-2017.html', 'Homepage:vysledky2017');
		$router[] = new Route('vysledky-2018.html', 'Homepage:vysledky2018');
		$router[] = new Route('vysledky-2019.html', 'Homepage:vysledky2019');

		$router[] = new Route('admin/regenerateQR', 'Homepage:regenerateQR');
		$router[] = new Route('admin/testing', 'Homepage:test');

		$router[] = new Route('mobile/phone-races', 'Mobile:phoneRaces');
		$router[] = new Route('mobile/phone-race/<race_id>', 'Mobile:phoneRace');


		$router[] = new SimpleRouter('Homepage:default');
		return $router;
	}

}
