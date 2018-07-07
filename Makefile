install:
	pip install pipenv
	pipenv install

run:
	pipenv run -- honcho -f Procfile.dev start

migrate:
	pipenv run -- python manage.py migrate

fetchcurrentweather:
	pipenv run -- python manage.py fetchcurrentweather

fetchhourlyforecast:
	pipenv run -- python manage.py fetchhourlyforecast

fetchdailyforecast:
	pipenv run -- python manage.py fetchdailyforecast

test:
	pipenv run -- py.test -s -v --cov-report html --cov-report term --cov=weather --cov=weatherservice --cov=website
