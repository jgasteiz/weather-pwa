setup:
	pip install pipenv
	pipenv install

activate:
	pipenv shell

run:
	pipenv run -- python manage.py runserver

test:
	pipenv run -- pytest -s -v
