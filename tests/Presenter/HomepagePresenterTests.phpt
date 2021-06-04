<?php

declare(strict_types=1);

namespace Tests\Lesempolem\Presenter;

use Lesempolem\Bootstrap;
use Nette\Application\IPresenterFactory;
use Nette\Application\Request;
use Nette\Application\Responses\RedirectResponse;
use Nette\Application\Responses\TextResponse;
use Nette\DI\Container;
use Tester\Assert;
use Tester\TestCase;

require __DIR__ . '/../bootstrap.php';

/** @var Container $container */
$container = Bootstrap::boot();

/** @var IPresenterFactory $presenterFactory */


final class HomepagePresenterTests extends TestCase
{

    private IPresenterFactory $presenterFactory;

    public function __construct(Container $container)
    {
        $this->presenterFactory = $container->getByType(IPresenterFactory::class);
    }

    public function testHomepage()
    {
        $response = $this->sendRequest('Homepage', 'default', 'GET');
        $html = (string)$response->getSource();
        Assert::contains('Lesempolem', $html);
    }

    public function testRegistration()
    {
        $response = $this->sendRequest('Homepage', 'registration', 'GET');
        $html = (string)$response->getSource();
        Assert::contains('Lesempolem', $html);
        Assert::contains('Příjmení', $html);
        Assert::contains('Souhlasím', $html);
    }

    public function testRegistrationForm()
    {
        $hp = $this->presenterFactory->createPresenter('Homepage');
        $hp->autoCanonicalize = false;
        $post = [
            'name' => 'test name',
            'surname' => 'surname',
            'email' => 'test@test.cz',
            'club' => 'city',
            'born' => '2004-02-03',
            'sex' => 'm',
            'agree' => 'on',
            'ok' => 'Provést registraci',
            '_do' => 'registrationForm-submit',
        ];
        $request = new Request('Homepage', 'POST', ['action' => 'registration', '_fid' => 'k6pz-submit'], $post);


        /** @var RedirectResponse $response */
        $response = $hp->run($request);
        if (!$response instanceof RedirectResponse) {
            Assert::fail('Invalid response from registration form');
        }
    }

    public function testInfo()
    {
        $response = $this->sendRequest('Homepage', 'info', 'GET');
        $html = (string)$response->getSource();
        Assert::contains('Lesempolem', $html);
        Assert::contains('harmonogram', $html);
        Assert::contains('Propozice', $html);
        Assert::contains('Prezence', $html);
    }

    public function testResultsNav()
    {
        $response = $this->sendRequest('Homepage', 'vysledky', 'GET');
        $html = (string)$response->getSource();
        Assert::contains('Lesempolem', $html);
        Assert::contains('Rekord', $html);
    }

    public function testResults()
    {
        $pages = [
            'vysledky2013',
            'vysledky2014',
            'vysledky2015',
            'vysledky2016',
            'vysledky2017',
            'vysledky2018',
            'vysledky2019',
        ];
        foreach ($pages as $page) {
            $response = $this->sendRequest('Homepage', $page, 'GET');
            $html = (string)$response->getSource();
            Assert::contains('Lesempolem', $html);
            Assert::contains('Čas', $html);
        }
    }

    public function testVideo()
    {
        $response = $this->sendRequest('Homepage', 'video', 'GET');
        $html = (string)$response->getSource();
        Assert::contains('Lesempolem', $html);
        Assert::contains('video', $html);
    }

    public function testTrat()
    {
        $response = $this->sendRequest('Homepage', 'trat', 'GET');
        $html = (string)$response->getSource();
        Assert::contains('Lesempolem', $html);
        Assert::contains('Ke stažení:', $html);
    }

    public function testContacts()
    {
        $response = $this->sendRequest('Homepage', 'kontakty', 'GET');
        $html = (string)$response->getSource();
        Assert::contains('Lesempolem', $html);
        Assert::contains('Skoták', $html);
        Assert::contains('Orálek', $html);
        Assert::contains('Kozák', $html);
        Assert::contains('Němec', $html);
        Assert::contains('Open source', $html);
    }

    public function testRules()
    {
        $response = $this->sendRequest('Homepage', 'rules', 'GET');
        $html = (string)$response->getSource();
        Assert::contains('Lesempolem', $html);
        Assert::contains('Podmínky registrace', $html);
    }

    private function sendRequest(string $presenter, string $action, string $method): TextResponse
    {
        $hp = $this->presenterFactory->createPresenter($presenter);
        $hp->autoCanonicalize = false;
        $request = new Request($presenter, $method, ['action' => $action]);

        /** @var TextResponse $response */
        $response = $hp->run($request);
        if (!$response instanceof \Nette\Application\Responses\TextResponse) {
            Assert::fail(sprintf('Invalid response from %s:%s', $presenter, $action));
        }

        return $response;
    }
}

(new HomepagePresenterTests($container))->run();