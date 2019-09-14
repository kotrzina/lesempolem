<?php

namespace Lesempolem\Presenters;


use Lesempolem\Model\LiveResultsService;
use Nette\Utils\JsonException;

class ApiPresenter extends BasePresenter
{

	const SECURE_TOKEN_NAME = 'LPAUTH';

	/** @var LiveResultsService @inject */
	public $liveResultsService;

	/** @var string */
	private $liveApiToken;

	/**
	 * @param $liveApiToken
	 */
	public function __construct($liveApiToken)
	{
		parent::__construct();
		$this->liveApiToken = $liveApiToken;
	}

	/**
	 * @throws \Nette\Application\AbortException
	 */
	public function actionResults()
	{
		$token = $this->getHttpRequest()->getHeader(self::SECURE_TOKEN_NAME);

		if ($token === $this->liveApiToken) {
			$data = $this->getHttpRequest()->getRawBody();
			try {
				$this->liveResultsService->insertResult($data);
			} catch (JsonException $exception) {
				$this->sendJson(['status' => 'error', 'message' => 'Json error']);
			} catch (\PDOException $exception) {
				$this->sendJson(['status' => 'error', 'message' => 'Database error: ' . $exception->getMessage()]);
			} catch (\Exception $exception) {
				$this->sendJson(['status' => 'error', 'message' => 'Server error']);
			}

			$this->sendJson(['status' => 'ok']);
		}

		$this->sendJson(['status' => 'error', 'message' => 'Auth error']);
	}

}
