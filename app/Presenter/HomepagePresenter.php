<?php

declare(strict_types=1);

namespace Lesempolem\Presenter;

use Lesempolem\Model\Entity\Racer;
use Lesempolem\Model\Filter\FilterService;
use Lesempolem\Model\Filter\MenFilter;
use Lesempolem\Model\Filter\WomenFilter;
use Lesempolem\Model\Service\ConfigService;
use Lesempolem\Model\Storage\IStorage;
use Nette\Application\UI\Form;
use Nette\Caching\Cache;
use Nette\Caching\Storage;


class HomepagePresenter extends BasePresenter
{

    const TRAT_CACHE_KEY = 'trat';
    const CACHE_TIME = '7 days';

    private ConfigService $configService;

    private Cache $cache;

    private IStorage $storage;

    public function __construct(
        ConfigService $configService,
        Storage $cacheStorage,
        IStorage $storage
    )
    {
        parent::__construct();
        $this->configService = $configService;
        $this->cache = new Cache($cacheStorage);
        $this->storage = $storage;
    }


    protected function startup()
    {
        parent::startup();

        $this->template->isSale = $this->configService->isRegistrationEnabled();

        $today = new \DateTime();
        $this->template->showOnline = $today->format('d/m/Y') === '15/06/2019' ? true : false;

        $titleMapping = [
            'default' => 'LESEMPOLEM.cz',
            'registration' => 'LESEMPOLEM.cz - registrace',
            'info' => 'LESEMPOLEM.cz - informace',
            'vysledky' => 'LESEMPOLEM.cz - výsledky',
            'vysledky2013' => 'LESEMPOLEM.cz - výsledky 2013',
            'vysledky2014' => 'LESEMPOLEM.cz - výsledky 2014',
            'vysledky2015' => 'LESEMPOLEM.cz - výsledky 2015',
            'vysledky2016' => 'LESEMPOLEM.cz - výsledky 2016',
            'vysledky2017' => 'LESEMPOLEM.cz - výsledky 2017',
            'vysledky2018' => 'LESEMPOLEM.cz - výsledky 2018',
            'vysledky2019' => 'LESEMPOLEM.cz - výsledky 2019',
            'video' => 'LESEMPOLEM.cz - video',
            'trat' => 'LESEMPOLEM.cz - trať',
            'kontakty' => 'LESEMPOLEM.cz - kontakty',
            'payment' => 'LESEMPOLEM.cz - dokončení registrace',
        ];

        $this->template->pageTitleMobile =
            isset($titleMapping[$this->getAction()])
                ? $titleMapping[$this->getAction()]
                : "";
    }

    public function renderRegistration(): void
    {
         $all = $this->storage->getAll();



        $this->template->men = FilterService::applyFilters($all, new MenFilter());
        $this->template->women = FilterService::applyFilters($all, new WomenFilter());
        $this->template->disabled = $this->configService->isRegistrationEnabled();

        if (!$this->configService->isRegistrationEnabled()) {
            // $this->flashMessage("Registrace  není možná.");
        }

    }

    public function createComponentRegistrationForm(): Form
    {
        $disabled = false;
        $form = new Form();
        $form->addText('email', 'Email:')
            ->addRule(Form::EMAIL, 'Prosím zadejte validní email.')
            ->setRequired("Zadejte prosím email.")
            ->setDisabled($disabled);
        $form->addText('name', 'Jméno:')
            ->setRequired("Prosím zadejte jméno")
            ->setDisabled($disabled);
        $form->addText('surname', 'Příjmení:')
            ->setRequired("Prosím zadejte příjmení")
            ->setDisabled($disabled);
        $form->addText('club', 'Klub / Bydliště:')
            ->setRequired()
            ->setDisabled($disabled);
        $form->addText('born', 'Rok narození:')
            ->addRule(Form::PATTERN, 'Prosím zadejte datum norození', '[0-9]{4}\-[0-9]{2}\-[0-9]{2}')
            ->setRequired("Prosím zadejte rok narození")
            ->setDisabled($disabled);
        $form->addSelect('sex', 'Pohlaví:', ['m' => 'Muž', 'f' => 'Žena'])
            ->setPrompt("-")
            ->setRequired("Zvolte prosím pohlaví")
            ->setDisabled($disabled);
        $form->addCheckbox('agree', '')
            ->setDefaultValue(true)
            ->setRequired("Prosím odsouhlaste podmínky")
            ->setDisabled($disabled);
        $form->addSubmit('ok', "Provést registraci")
            ->setDisabled($disabled);
        $form->onSuccess[] = function () use ($form): void {
            $this->registrationFormSubmitted($form);
        };
        return $form;
    }


    /**
     * @param Form $form
     * @throws \Exception
     */
    public function registrationFormSubmitted(Form $form): void
    {
        $values = (array)$form->getValues();
        $racer = new Racer(
            $values['name'],
            $values['surname'],
            $values['email'],
            $values['club'],
            (new \DateTimeImmutable($values['born']))->format('Y-m-d'),
            $values['sex'],
            (new \DateTimeImmutable())->format('Y-m-d H:i:s'),
        );

        $this->storage->insert($racer);

        $this->flashMessage('Registrace proběhla úspěšně.');
        $this->redirect('this');
    }

    public function renderTrat(): void
    {
        $data = $this->cache->load(self::TRAT_CACHE_KEY);
        if (NULL === $data) {
            $xml = new \DOMDocument();
            $xml->load(__DIR__ . "/../lp.xml");
            $data = [];
            $elements = $xml->getElementsByTagName('coordinates');
            $first = TRUE;
            foreach ($elements as $element) {
                if (!$first) {
                    $gps = explode(",", $element->nodeValue);
                    $data[] = [
                        'lat' => $gps['0'],
                        'lon' => $gps['1'],
                    ];
                } else {
                    $first = FALSE;
                }
            }
            $this->cache->save(self::TRAT_CACHE_KEY, $data, array(
                Cache::EXPIRE => self::CACHE_TIME,
            ));
        }

        $this->template->data = $data;
    }

    public function renderLive(): void
    {
        $this->template->data = [];
    }

    public function actionOnline(): void
    {
        $this->redirect('live');
    }

}
