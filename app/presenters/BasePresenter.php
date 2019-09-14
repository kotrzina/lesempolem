<?php

namespace App\Presenters;

use Lesempolem\StaticFiles;
use Lesempolem\Environment;
use Lesempolem\UUID;
use Nette;
use Nette\Application\UI\ITemplate;
use TimeFormatter;


/**
 * Base presenter for all application presenters.
 */
abstract class BasePresenter extends Nette\Application\UI\Presenter
{

	/** @var Environment @inject */
	public $environment;

	protected function startup()
	{
		parent::startup();
		$this->template->cssVersion = StaticFiles::CSS_VERSION;
		$this->template->jsVersion = StaticFiles::JS_VERSION;
		$this->template->googleAnalytics = $this->environment->isGoogleAnalyticsEnabled();
	}

	protected function createTemplate(): ITemplate
	{
		$template = parent::createTemplate();

		$template->addFilter('time', [TimeFormatter::class, 'time']);
		$template->addFilter('time_behind', [TimeFormatter::class, 'time_behind']);

		$template->addFilter('racer_number', function ($val) {
			if (preg_match("/([0-9]+)/", $val, $matches)) {
				return (int)$matches['1'];
			}
			return (int)$val;
		});

		return $template;
	}


}
