install:
	pip install pipenv
	pipenv install

run:
	pipenv run -- python manage.py runserver

migrate:
	pipenv run -- python manage.py migrate

fetchcurrentweather:
	pipenv run -- python manage.py fetchcurrentweather

fetchhourlyforecast:
	pipenv run -- python manage.py fetchhourlyforecast

fetchdailyforecast:
	pipenv run -- python manage.py fetchdailyforecast

test:
	pipenv run -- pytest -s -v
