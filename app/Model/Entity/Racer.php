<?php

declare(strict_types=1);

namespace Lesempolem\Model\Entity;

use JetBrains\PhpStorm\ArrayShape;

class Racer
{

    public const
        MALE = 'm',
        FEMALE = 'f';

    public const SUPPORTED_GENDERS = [
        self::MALE,
        self::FEMALE,
    ];

    private string $name;
    private string $surname;
    private string $email;
    private string $club;
    private string $dob;
    private string $gender;
    private string $created;

    public function __construct(string $name, string $surname, string $email, string $club, string $dob, string $gender, string $created)
    {
        if (!in_array($gender, [self::MALE, self::FEMALE])) {
            throw new \Exception('LGBT');
        }

        $this->name = $name;
        $this->surname = $surname;
        $this->email = $email;
        $this->club = $club;
        $this->dob = $dob;
        $this->gender = $gender;
        $this->created = $created;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getSurname(): string
    {
        return $this->surname;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getClub(): string
    {
        return $this->club;
    }

    public function getDob(): string
    {
        return $this->dob;
    }

    public function getGender(): string
    {
        return $this->gender;
    }

    public function getCreated(): string
    {
        return $this->created;
    }
    
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'surname' => $this->surname,
            'email' => $this->email,
            'club' => $this->club,
            'dob' => $this->dob,
            'gender' => $this->gender,
            'created' => $this->created,
        ];
    }

}