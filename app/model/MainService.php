<?php

namespace Lesempolem;


use Lesempolem\Entity\Category;
use Lesempolem\Entity\Payment;
use Lesempolem\Entity\Racer;
use Lesempolem\Filter\IFilter;
use Nette\Application\BadRequestException;
use Nette\Database\Context;
use Nette\Database\UniqueConstraintViolationException;
use Nette\Http\Request;
use Nette\Http\Session;
use Nette\Utils\DateTime;
use Nette\Utils\Random;
use Tracy\Debugger;

class MainService
{

	const CATEGORY_TABLE = "category";

	const REGISTRATION_TABLE = "registration";

	/** @var Context */
	protected $db;

	/** @var  Request */
	protected $httpRequest;

	/** @var  Session */
	protected $session;

	/** @var  Mailer */
	protected $mailer;


	public function __construct(Context $context, Request $httpRequest, Session $session, Mailer $mailer)
	{
		$this->db = $context;
		$this->httpRequest = $httpRequest;
		$this->session = $session;
		$this->mailer = $mailer;
	}

	/**
	 * @return array
	 */
	public function getCategories()
	{
		return $this->db->table(self::CATEGORY_TABLE)->order('id')->fetchAll();
	}

	/**
	 * @param IFilter[] $filters
	 * @return array
	 */
	public function getAllPerson($filters = [])
	{
		$data = $this->db->table(self::REGISTRATION_TABLE)->order('created DESC')->fetchAll();

		foreach ($filters as $filter) {
			$data = $filter->filter($data);
		}

		return $data;
	}

	public function insertRacer(Racer $racer)
	{
		$data = [
			'name' => $racer->getName(),
			'surname' => $racer->getSurname(),
			'club' => $racer->getClub(),
			'year' => $racer->getYear(),
			'sex' => $racer->getSex(),
			'category' => $racer->getCategory(),
			'price' => $racer->getPrice(),
			'created' => $racer->getCreated(),
		];
		$row = $this->db->table(self::REGISTRATION_TABLE)->insert($data);
		return $row['id'];
	}
} 