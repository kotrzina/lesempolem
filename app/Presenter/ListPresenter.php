<?php

namespace Lesempolem\Presenter;

use Nette\Application\Responses\JsonResponse;
use Nette\Application\UI\Form;
use Nette\Http\Session;
use Nette\Http\SessionSection;

class ListPresenter extends BasePresenter
{

	const PASSWORD = 'svazarm';

	/** @inject */
	public Session $session;

	private SessionSection $sessionSection;

	protected function startup()
	{
		parent::startup();
		$this->sessionSection = $this->session->getSection('list');
		if (!isset($this->sessionSection->logged)) {
			$this->sessionSection->logged = FALSE;
		}
	}

	public function createComponentLoginForm(): Form
	{
		$form = new Form();
		$form->addPassword('password', "Heslo: ");
		$form->addSubmit('ok', "OK");
		$form->onSuccess[] = function () use ($form): void {
			$this->loginFormSubmitted($form);
		};
		return $form;
	}

	public function loginFormSubmitted(Form $form): void
	{
		$values = $form->getValues();
		if ($values->password === self::PASSWORD) {
			$this->sessionSection->logged = TRUE;
			$this->redirect('table');
		}

		$this->redirect('this');
	}

	public function renderTable(): void
	{
		if (TRUE !== $this->sessionSection->logged) {
			$this->redirect('form');
		}

		$this->template->list = [];
	}

	public function renderJson(): void
	{
		if (TRUE !== $this->sessionSection->logged) {
			$this->redirect('form');
		}
//
//		$racers = $this->repository->getAllPerson();
//		$data = [];

		$this->sendResponse(new JsonResponse([]));
	}

}