<?php

namespace Lesempolem\Model;


use Nette\Application\AbortException;

class StaticFiles
{

	const CSS_VERSION = 'v3.0.2';

	const JS_VERSION = 'v3.0.1';

	public function __construct()
	{
		throw new AbortException("You can't create instance of CSS class");
	}

}