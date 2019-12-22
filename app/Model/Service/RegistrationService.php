<?php

namespace Lesempolem\Model\Service;

use Lesempolem\Model\Filter\IFilter;
use Nette\Database\Context;

class RegistrationService
{

    private const REGISTRATION_TABLE = "registration";

    /** @var Context */
    protected Context $db;


    public function __construct(Context $context)
    {
        $this->db = $context;
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

    /**
     * Inserts raw data from web form
     * @param array $racer
     */
    public function insertRacer(array $racer)
    {
        $this->db->table(self::REGISTRATION_TABLE)->insert($racer);
    }
} 