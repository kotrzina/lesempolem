up:
	touch .env
	mkdir -p temp/cache
	mkdir -p temp/sessions
	mkdir -p temp/data
	mkdir -p log
	mkdir -p www/static_files
	composer install
	docker-compose up -d

stop:
	docker-compose stop

clean:
	docker-compose down
	rm -rf temp/
	rm -rf log/

test:
	php vendor/bin/tester tests
	php -d memory_limit=20G vendor/bin/phpstan analyse -l max -c phpstan.neon app