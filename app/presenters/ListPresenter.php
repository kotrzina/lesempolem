<?php

namespace App\Presenters;


use Lesempolem\Entity\Racer;
use Lesempolem\MainService;
use Nette\Application\Responses\JsonResponse;
use Nette\Application\UI\Form;
use Nette\Http\Session;
use Nette\Http\SessionSection;

class ListPresenter extends BasePresenter
{

	const PASSWORD = 'svazarm';

	/**
	 * @var MainService @inject
	 */
	public $repository;

	/**
	 * @var Session @inject
	 */
	public $session;

	/**
	 * @var SessionSection
	 */
	private $sessionSection;

	protected function startup()
	{
		parent::startup();
		$this->sessionSection = $this->session->getSection('list');
		if (!isset($this->sessionSection->logged)) {
			$this->sessionSection->logged = FALSE;
		}
	}

	public function createComponentLoginForm()
	{
		$form = new Form();
		$form->addPassword('password', "Heslo: ");
		$form->addSubmit('ok', "OK");
		$form->onSuccess[] = [$this, 'loginFormSubmitted'];
		return $form;
	}

	public function loginFormSubmitted(Form $form)
	{
		$values = $form->getValues();
		if ($values->password === self::PASSWORD) {
			$this->sessionSection->logged = TRUE;
			$this->redirect('table');
		}

		$this->redirect('this');
	}

	public function renderTable()
	{
		if (TRUE !== $this->sessionSection->logged) {
			$this->redirect('form');
		}

		$this->template->list = $this->repository->getAllPerson();
	}

	public function renderJson()
	{
		if (TRUE !== $this->sessionSection->logged) {
			$this->redirect('form');
		}

		$racers = $this->repository->getAllPerson();
		$data = [];

		foreach ($racers as $racer) {
			/** @var $racer Racer */
			$data[] = $racer->toArray();
		}

		$this->sendResponse(new JsonResponse($data));
		$this->terminate();
	}

}