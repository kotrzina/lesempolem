<?php

declare(strict_types=1);

namespace Lesempolem\Presenter;

use Lesempolem\Model\TimeFormatter;
use Lesempolem\Model\StaticFiles;
use Lesempolem\Model\Environment;
use Nette;
use Nette\Application\UI\ITemplate;
use Nette\Bridges\ApplicationLatte\Template;


/**
 * @property-write Template|\stdClass $template
 */
abstract class BasePresenter extends Nette\Application\UI\Presenter
{

	/** @inject */
	public Environment $environment;

	protected function startup()
	{
		parent::startup();
		$this->template->cssVersion = StaticFiles::CSS_VERSION;
		$this->template->jsVersion = StaticFiles::JS_VERSION;
		$this->template->googleAnalytics = $this->environment->isGoogleAnalyticsEnabled();
	}

	protected function createTemplate(): ITemplate
	{
		/** @var Template $template */
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
