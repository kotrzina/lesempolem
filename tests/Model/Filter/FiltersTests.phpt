<?php


use Lesempolem\Model\Filter\MenFilter;
use Lesempolem\Model\Filter\NotDeletedFilter;
use Lesempolem\Model\Filter\WomenFilter;
use Tester\TestCase;

require __DIR__ . "/../../bootstrap.php";

class FiltersTests extends TestCase
{

	public function testMen()
	{
		$data = [
			0 => [
				'id' => 1,
				'sex' => 0,
				'deleted' => 0
			],
			1 => [
				'id' => 2,
				'sex' => 1,
				'deleted' => 0
			],
			2 => [
				'id' => 3,
				'sex' => 0,
				'deleted' => 1
			],
			3 => [
				'id' => 4,
				'sex' => 1,
				'deleted' => 1
			],
		];

		$expected = [
			0 => [
				'id' => 1,
				'sex' => 0,
				'deleted' => 0
			],
			2 => [
				'id' => 3,
				'sex' => 0,
				'deleted' => 1
			],
		];

		$menFilter = new MenFilter();
		\Tester\Assert::same($expected, $menFilter->filter($data));
	}

	public function testNotDeleted()
	{
		$data = [
			0 => [
				'id' => 1,
				'sex' => 0,
				'deleted' => 0
			],
			1 => [
				'id' => 2,
				'sex' => 1,
				'deleted' => 0
			],
			2 => [
				'id' => 3,
				'sex' => 0,
				'deleted' => 1
			],
			3 => [
				'id' => 4,
				'sex' => 1,
				'deleted' => 1
			],
		];

		$expected = [
			0 => [
				'id' => 1,
				'sex' => 0,
				'deleted' => 0
			],
			1 => [
				'id' => 2,
				'sex' => 1,
				'deleted' => 0
			],
		];

		$filter = new NotDeletedFilter();
		\Tester\Assert::same($expected, $filter->filter($data));
	}

	public function testWomen()
	{
		$data = [
			0 => [
				'id' => 1,
				'sex' => 0,
				'deleted' => 0
			],
			1 => [
				'id' => 2,
				'sex' => 1,
				'deleted' => 0
			],
			2 => [
				'id' => 3,
				'sex' => 0,
				'deleted' => 1
			],
			3 => [
				'id' => 4,
				'sex' => 1,
				'deleted' => 1
			],
		];

		$expected = [
			1 => [
				'id' => 2,
				'sex' => 1,
				'deleted' => 0
			],
			3 => [
				'id' => 4,
				'sex' => 1,
				'deleted' => 1
			],
		];

		$filter = new WomenFilter();
		\Tester\Assert::same($expected, $filter->filter($data));
	}
}

(new FiltersTests())->run();