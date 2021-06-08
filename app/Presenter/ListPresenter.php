<?php

namespace Lesempolem\Presenter;

use Lesempolem\Model\Storage\IStorage;
use Nette\Application\Responses\JsonResponse;
use Nette\Application\UI\Form;
use Nette\Http\Session;
use Nette\Http\SessionSection;

class ListPresenter extends BasePresenter
{


    private SessionSection $sessionSection;

    public function __construct(
        private string $password,
        private Session $session,
        private IStorage $storage,
    )
    {
        parent::__construct();
        $this->sessionSection = $this->session->getSection('list');
    }

    protected function startup()
    {
        parent::startup();
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
        if (!empty($this->password) && $values->password === $this->password) {
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

        $this->template->list = $this->storage->getAll();
    }

    public function renderJson(): void
    {
        if (TRUE !== $this->sessionSection->logged) {
            $this->redirect('form');
        }

        $response = [];
        $racers = $this->storage->getAll();
        foreach ($racers as $racer) {
            $response[] = $racer->toArray();
        }

        $this->sendResponse(new JsonResponse($response));
    }

}