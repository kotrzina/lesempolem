<?php

namespace Lesempolem\Model;

use Nette\Database\Context;
use Nette\Utils\Json;

class LiveResultsService
{

	/** @var Context */
	private $database;

	/**
	 * @param Context $database
	 */
	public function __construct(Context $database)
	{
		$this->database = $database;
	}

    /**
     * @return \Nette\Database\IRow|\Nette\Database\Table\ActiveRow
     * @throws \Exception
     */
	public function getLastResults()
	{
		$row = $this->database->table('results_live')->order('created DESC')->limit(1)->fetch();
		if (!$row) {
		    throw new \Exception('Could not find data');
		}

		return $row;
	}

	/**
	 * @param string $jsonData
	 * @throws \Nette\Utils\JsonException
	 */
	public function insertResult(string $jsonData): void
	{
		$lastResult = $this->getLastResults();
		$hash = md5($jsonData);
		Json::decode($jsonData); // is json valid

		// result is different than last one
		if ($lastResult['hash'] !== $hash) {
			$this->database->table('results_live')->insert([
				'created' => new \DateTime(),
				'hash' => $hash,
				'data' => $jsonData
			]);
		}
	}

} 