<?php

return [
	'parameters' => [
		'env' => \getenv('ENV'),
		'db' => [
			'dsn' => \getenv('DB_DSN'),
			'user' => \getenv('DB_USER'),
			'pass' => \getenv('DB_PASS'),
		],
		'api' => [
			'live_token' => \getenv('LIVE_API_TOKEN'),
		],
	],
];
