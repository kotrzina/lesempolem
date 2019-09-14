<?php

namespace Lesempolem\Model;

class TimeFormatter
{


	/**
	 * @param $val - time in seconds
	 * @return string
	 */
	public static function time($val, $prefix = "")
	{
		if ($val === 0) {
			return "-";
		}
		$hours = floor($val / 60 / 60);
		$minutes = floor(($val - $hours * 60 * 60) / 60);
		$seconds = $val - ($hours * 60 * 60) - ($minutes * 60);

		return $prefix .
			str_pad($hours, 2, "0", STR_PAD_LEFT) . ":" .
			str_pad($minutes, 2, "0", STR_PAD_LEFT) . ":" .
			str_pad($seconds, 2, "0", STR_PAD_LEFT);
	}

	/**
	 * @param $val - time in seconds
	 * @return string
	 */
	public static function time_behind($val)
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