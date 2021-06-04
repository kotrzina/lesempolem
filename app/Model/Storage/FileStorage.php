<?php

declare(strict_types=1);

namespace Lesempolem\Model\Storage;

use Lesempolem\Model\Entity\Racer;
use Nette\Utils\Json;
use function file_get_contents;
use function file_put_contents;

class FileStorage implements IStorage
{

    private const FILENAME = 'data.json';

    private string $path;

    public function __construct(string $path, string $filename = self::FILENAME)
    {
        $this->path = $path . DIRECTORY_SEPARATOR . $filename;
        if (!is_file($this->path)) {
            touch($this->path);
            file_put_contents($this->path, '[]', LOCK_EX); // empty json array
        }
    }

    /**
     * @return Racer[]
     */
    public function getAll(): array
    {
        $content = file_get_contents($this->path);
        if ($content === false) {
            throw new \Exception('could not read racers');
        }
        $data = Json::decode($content, Json::FORCE_ARRAY);
        return $this->decodeAll($data);
    }

    public function insert(Racer $racer): void
    {
        $content = file_get_contents($this->path);
        if ($content === false) {
            throw new \Exception('could not read racers');
        }
        $data = Json::decode($content, Json::FORCE_ARRAY);
        $data[] = $this->encodeRacer($racer);
        file_put_contents($this->path, Json::encode($data, Json::PRETTY), LOCK_EX);
    }

    public function flush(): void
    {
        file_put_contents($this->path, '[]', LOCK_EX); // empty json array
    }

    private function encodeRacer(Racer $racer): array
    {
        return [
            'n' => $racer->getName(),
            's' => $racer->getSurname(),
            'e' => $racer->getEmail(),
            'c' => $racer->getClub(),
            'd' => $racer->getDob(),
            'g' => $racer->getGender(),
            'cr' => $racer->getCreated(),
        ];
    }

    private function decodeAll(array $data): array
    {
        $r = [];
        foreach ($data as $item) {
            $r[] = $this->decodeRacer($item);
        }

        return $r;
    }

    private function decodeRacer(array $data): Racer
    {
        return new Racer(
            $data['n'],
            $data['s'],
            $data['e'],
            $data['c'],
            $data['d'],
            $data['g'],
            $data['cr']
        );
    }
}