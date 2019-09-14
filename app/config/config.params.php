<?php

return [
	'parameters' => [
		'env' => \getenv('ENV'),
		'db' => [
			'dsn' => \getenv('DB_DSN'),
			'user' => \getenv('DB_USER'),
			'pass' => \getenv('DB_PASS'),
		],
		'mailer' => [
			'host' => 'smtp.gmail.com',
			'port' => 465,
			'username' => 'lesempolem@gmail.com',
			'password' => \getenv('MAILER_PASS'),
			'secure' => 'ssl',
		],
		'api' => [
			'live_token' => \getenv('LIVE_API_TOKEN'),
		],
	],
];
