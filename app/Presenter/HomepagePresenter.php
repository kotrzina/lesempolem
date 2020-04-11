<?php

declare(strict_types=1);

namespace Lesempolem\Presenter;

use Lesempolem\Model\Constant\Payment;
use Lesempolem\Model\Constant\Race;
use Lesempolem\Model\Filter\MenFilter;
use Lesempolem\Model\Filter\NotDeletedFilter;
use Lesempolem\Model\Filter\WomenFilter;
use Lesempolem\Model\LiveResultsService;
use Lesempolem\Model\Service\RegistrationService;
use Lesempolem\Model\Service\EmailService;
use Lesempolem\Model\Service\ConfigService;
use Nette\Application\UI\Form;
use Nette\Caching\Cache;
use Nette\Caching\IStorage;
use Nette\Utils\DateTime;
use Nette\Utils\Json;


class HomepagePresenter extends BasePresenter
{

    const TRAT_CACHE_KEY = 'trat';
    const CACHE_TIME = '7 days';

    /** @var RegistrationService */
    private RegistrationService $registrationService;

    /** @var ConfigService */
    private ConfigService $configService;

    /** @var LiveResultsService */
    private LiveResultsService $liveResultsService;

    /** @var Cache */
    private Cache $cache;

    /** @var EmailService */
    private EmailService $emailService;

    /**
     * @param RegistrationService $registrationService
     * @param ConfigService $configService
     * @param LiveResultsService $liveResultsService
     * @param EmailService $emailService
     * @param IStorage $storage
     */
    public function __construct(
        RegistrationService $registrationService,
        ConfigService $configService,
        LiveResultsService $liveResultsService,
        EmailService $emailService,
        IStorage $storage
    )
    {
        parent::__construct();
        $this->registrationService = $registrationService;
        $this->configService = $configService;
        $this->liveResultsService = $liveResultsService;
        $this->cache = new Cache($storage);
        $this->emailService = $emailService;
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
        $this->template->men = $this->registrationService->getAllPerson([
            new MenFilter(),
            new NotDeletedFilter()
        ]);

        $this->template->women = $this->registrationService->getAllPerson([
            new WomenFilter(),
            new NotDeletedFilter()
        ]);
        $this->template->disabled = $this->configService->isRegistrationEnabled();

        if (!$this->configService->isRegistrationEnabled()) {
            $this->flashMessage("Registrace  není možná.");
        }

    }

    public function createComponentRegistrationForm(): Form
    {
        $disabled = true;
        $form = new Form();
        $form->addSelect('race', 'Závod:', Race::getRaces())
            ->setPrompt('-')
            ->setRequired("Prosím vyberte závod.")
            ->setDisabled($disabled);
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
        $form->addSelect('sex', 'Pohlaví:', ['Muž', 'Žena'])
            ->setPrompt("-")
            ->setRequired("Zvolte prosím pohlaví")
            ->setDisabled($disabled);
        $form->addCheckbox('agree', '')
            ->setDefaultValue(true)
            ->setRequired("Prosím odsouhlaste podmínky")
            ->setDisabled($disabled);
        $form->addSubmit('ok', "Provést registraci")
            ->setDisabled($disabled);
        $form->onSuccess[] = function () use ($form) {
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
        $values['created'] = new \DateTimeImmutable();
        $today = new DateTime('now');
        $values['vs'] = (int)($today->format('md') * 1e6 + \mt_rand(0, 999999));
        unset($values['agree']);


        $this->registrationService->insertRacer($values);
        $this->emailService->sendConfirmation(
            $values['email'],
            $values['name'],
            $values['surname'],
            Payment::getRacePrice($values['race']),
            $values['vs'],
            );


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
        $last = $this->liveResultsService->getLastResults();
        $data = Json::decode($last['data'], Json::FORCE_ARRAY);
        $this->template->data = $data;
    }

    public function actionOnline(): void
    {
        $this->redirect('live');
    }

}
