install:
	pip install pipenv
	pipenv install

run:
	pipenv run -- python manage.py runserver

migrate:
	pipenv run -- python manage.py migrate

test:
	pipenv run -- pytest -s -v
