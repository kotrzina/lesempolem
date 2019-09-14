<?php

use Lesempolem\Model\StaticFiles;

require __DIR__ . '/../vendor/autoload.php';

$output_dir = __DIR__ . "/../www/static_files";

$css = new \MatthiasMullie\Minify\CSS();
$css->add(__DIR__ . "/../www/bootstrap/css/bootstrap.min.css");
$css->add(__DIR__ . "/../www/bootstrap/css/bootstrap-theme.min.css");
$css->add(__DIR__ . "/../www/css/styles.css");

$css->minify($output_dir . "/styles_" . StaticFiles::CSS_VERSION . ".css");
echo "\nCSS has been generated\n";

$js = new \MatthiasMullie\Minify\JS();
$js->add(__DIR__ . "/../www/js/jquery-1.11.0.min.js");
$js->add(__DIR__ . "/../www/bootstrap/js/bootstrap.min.js");
$js->add(__DIR__ . "/../www/js/validationRegistration.js");
$js->add(__DIR__ . "/../www/js/validationPayment.js");
$js->add(__DIR__ . "/../www/js/fixFooter.js");
$js->add(__DIR__ . "/../www/js/toTop.js");

$js->minify($output_dir . "/scripts_" . StaticFiles::JS_VERSION . ".js");
echo "JS has been generated\n\n";