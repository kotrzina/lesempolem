up:
	touch .env
	mkdir -p temp/cache
	mkdir -p temp/sessions
	mkdir -p temp/data
	mkdir -p log
	mkdir -p www/static_files
	composer install

stop:
	docker-compose stop

clean:
	docker-compose down
	rm -rf temp/
	rm -rf log/

test:
	php vendor/bin/tester tests
	php -d memory_limit=20G vendor/bin/phpstan analyse -l max -c phpstan.neon app
coverage:
	pecl install xdebug || true # could be already installed
	php -c tests/php.xdebug.ini vendor/bin/tester -c tests/php.xdebug.ini --coverage coverage.html --coverage-src app