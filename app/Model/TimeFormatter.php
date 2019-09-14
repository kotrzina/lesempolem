<?php

namespace Lesempolem\Model;

class TimeFormatter
{


	/**
	 * @param int $val - time in seconds
	 * @param string $prefix
	 * @return string
	 */
	public static function time(int $val, string $prefix = ""): string
	{
		if ($val === 0) {
			return "-";
		}
		$hours = floor($val / 60 / 60);
		$minutes = floor(($val - $hours * 60 * 60) / 60);
		$seconds = $val - ($hours * 60 * 60) - ($minutes * 60);

		return $prefix .
			str_pad((string)$hours, 2, "0", STR_PAD_LEFT) . ":" .
			str_pad((string)$minutes, 2, "0", STR_PAD_LEFT) . ":" .
			str_pad((string)$seconds, 2, "0", STR_PAD_LEFT);
	}

	/**
	 * @param int $val - time in seconds
	 * @return string
	 */
	public static function time_behind(int $val): string
	{
		if ($val === 0) {
			return "-";
		}
		$hours = floor($val / 60 / 60);
		$minutes = floor(($val - $hours * 60 * 60) / 60);
		$seconds = $val - ($hours * 60 * 60) - ($minutes * 60);

		$return = '+ ';

		if ($hours > 0) {
			$return .= "{$hours}h ";
		}
		if ($minutes > 0) {
			$return .= "{$minutes}m ";
		}
		if ($seconds > 0) {
			$return .= "{$seconds}s";
		}

		return \Nette\Utils\Strings::trim($return);
	}

}