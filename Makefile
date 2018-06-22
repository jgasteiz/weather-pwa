install:
	pip install pipenv
	pipenv install

run:
	yarn webpack
	pipenv run -- python manage.py runserver

test:
	pipenv run -- pytest -s -v
