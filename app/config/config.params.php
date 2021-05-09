<?php

return [
    'parameters' => [
        'env' => \getenv('ENV'),
        'api' => [
            'live_token' => \getenv('LIVE_API_TOKEN'),
        ],
    ],
];
