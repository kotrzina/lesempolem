<?php

namespace Lesempolem\Presenters;

use Lesempolem\Model\Filter\MenFilter;
use Lesempolem\Model\Filter\NotDeletedFilter;
use Lesempolem\Model\Filter\WomenFilter;
use Lesempolem\Model\LiveResultsService;
use Lesempolem\Model\MainService;
use Lesempolem\Model\Service\RegistrationService;
use Nette\Application\UI\Form;
use Nette\Caching\Cache;
use Nette\Caching\IStorage;
use Nette\Utils\ArrayHash;
use Nette\Utils\DateTime;
use Nette\Utils\Json;


class HomepagePresenter extends BasePresenter
{

	const TRAT_CACHE_KEY = 'trat';
	const CACHE_TIME = '7 days';

	/** @var MainService @inject */
	public $repository;

	/** @var IStorage @inject */
	public $storage;

	/** @var RegistrationService @inject */
	public $registrationService;

	/** @var LiveResultsService @inject */
	public $liveResultsService;

	/** @var Cache */
	private $cache;

	/** @var ArrayHash */
	private $section;

	protected function startup()
	{
		parent::startup();
		$this->cache = new Cache($this->storage);
		$this->template->isSale = $this->registrationService->isRegistrationEnabled();

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

	public function renderInfo()
	{
		$this->template->categories = $this->repository->getCategories();
	}

	public function renderRegistration()
	{
		$this->template->men = $this->repository->getAllPerson([
			new MenFilter(),
			new NotDeletedFilter()
		]);

		$this->template->women = $this->repository->getAllPerson([
			new WomenFilter(),
			new NotDeletedFilter()
		]);
		$this->template->disabled = $this->registrationService->isRegistrationEnabled();

		if (!$this->registrationService->isRegistrationEnabled()) {
			//$this->flashMessage("Online registrace již není možná. Zaregistruj se prosím až na místě!");
			$this->flashMessage("Registrace  není možná.");
		}

	}

	public function createComponentRegistrationForm()
	{
		$form = new Form();
		$disabled = !($this->registrationService->isRegistrationEnabled());
		$form->addText('name', 'Jméno:')->setDisabled($disabled);
		$form->addText('surname', 'Příjmení:')->setDisabled($disabled);
		$form->addText('club', 'Klub / Bydliště:')->setDisabled($disabled);
		$form->addText('year', 'Rok narození:')->setDisabled($disabled);
		$form->addSelect('sex', 'Pohlaví:', array('Muž', 'Žena'))->setPrompt("-")->setDisabled($disabled);
		$categories = $this->repository->getCategories();
		$toForm = [];
		foreach ($categories as $category) {
			/** @var \stdClass $category */
			$toForm[$category->id] = $category->title;
		}
		$form->addSelect('category', "Kategorie:", $toForm)->setPrompt('-')->setDisabled($disabled);;
		$form->addSubmit('ok', "Provést registraci")->setDisabled($disabled);
		$form->onSuccess[] = [$this, 'registrationFormSubmitted'];
		return $form;
	}

	/**
	 * @todo Refactoring
	 */
	public function actionValidateCategory($year, $gender)
	{
		$year = (int)$year;
		$gender = (int)$gender;

		$return = [];
		$return['possible'] = [];

		$categories = $this->repository->getCategories();

		foreach ($categories as $category) {
			if ($gender === $category->getGender()
				&& $year >= $category->getYearFrom()
				&& $year <= $category->getYearTo()
			) {
				$return['suggest'] = $category->getId();
				break;
			}
		}

		if ($gender === 0) {
			$available = [1, 3, 5, 7, 9, 11, 15];
			$oldCategories = [16, 17, 18];
			foreach ($oldCategories as $oldCategory) {
				$category = $categories[$oldCategory];
				if ($year >= $category->getYearFrom() && $year <= $category->getYearTo()) {
					$available[] = $oldCategory;
				}
			}
			$return['possible'][] = 13; // prichozi kluci
		} elseif ($gender === 1) {
			$available = [2, 4, 6, 8, 10, 19];
			$oldCategories = [20, 21];
			foreach ($oldCategories as $oldCategory) {
				$category = $categories[$oldCategory];
				if ($year >= $category->getYearFrom() && $year <= $category->getYearTo()) {
					$available[] = $oldCategory;
				}
			}
			$return['possible'][] = 14; // prichozi holky
		} else {
			$available = [];
			$return['error'] = "Gender shit";
			$return['status'] = false;
		}

		$found = false;
		foreach ($available as $keyValue) {
			/** @var Category $category */
			$category = $categories[$keyValue];
			if (!$found && $year >= $category->getYearFrom()) {
				$found = true;
			}

			if ($found) {
				$return['possible'][] = $keyValue;
			}
		}

		// juniorky
		/** @var Category $c */
		$c = $categories[12];
		if ($gender === 1 && $year >= $c->getYearFrom() && $year <= $c->getYearTo()) {
			$return['possible'][] = 12;
		}

		sort($return['possible']);
		$this->sendJson($return);
	}

	/**
	 * @todo Refactoring
	 */
	public function registrationFormSubmitted(Form $form)
	{

		$values = $form->getValues();

		$categories = $this->repository->getCategories();
		/** @var Category $category */
		$category = $categories[$values->category];

		$racer = new Racer();
		$racer->setName($values->name);
		$racer->setSurname($values->surname);
		$racer->setClub($values->club);
		$racer->setYear($values->year);
		$racer->setSex($values->sex);
		$racer->setCategory($values->category);
		$racer->setPrice($category->getPrice());
		$racer->setCreated(new DateTime());

		if ($this->registrationService->generatePayment()) {
			$this->section->registration[] = $racer;
			$this->redirect('payment');
		} elseif ($this->registrationService->isRegistrationEnabled()) {
			$this->repository->insertRacer($racer);
			$this->flashMessage("Závodník byl zaregistrován.");
			$this->redirect('this');
		} else {
			$this->flashMessage("Registrace již není možná");
			$this->redirect('this');
		}
	}

	public function renderTrat()
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

	public function renderLive()
	{
		$last = $this->liveResultsService->getLastResults();
		$data = Json::decode($last['data'], Json::FORCE_ARRAY);
		$this->template->data = $data;
	}

	public function actionOnline()
	{
		$this->redirect('live');
	}

}
