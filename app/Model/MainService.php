<?php

namespace Lesempolem\Model;

use Lesempolem\Model\Filter\IFilter;
use Nette\Database\Context;
use Nette\Http\Request;
use Nette\Http\Session;

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
} 