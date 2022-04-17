
composer-install:
	composer require ramsey/uuid
	composer require predis/predis
	composer require laravel/breeze --dev

migrate:
	php artisan migrate

rollback:
	php artisan migrate:rollback