import datetime

import pytest
from django.test import Client
from django.urls import reverse
from django.utils import timezone

from weatherservice.tests import factory


@pytest.mark.django_db
def test_forecast_api_basic():
    # Create a few FactoryDataPoints
    factory.CurrentConditionsForecastDataPointFactory(
        location_name='London, UK',
        temperature=20
    )
    factory.HourlyForecastDataPointFactory(
        location_name='Bristol, UK',
        temperature=21
    )
    factory.DailyForecastDataPointFactory(
        location_name='San Francisco, USA',
        temperature=22
    )

    client = Client()
    url = reverse('api_forecast')
    response = client.get(url)
    assert response.status_code == 200

    # Expect a json with the three data points.
    current_conditions_json = response.json().get('current_conditions')
    hour_forecast_json = response.json().get('hourly_forecast')
    day_forecast_json = response.json().get('daily_forecast')
    assert len(day_forecast_json) == 1
    assert len(hour_forecast_json) == 1

    assert current_conditions_json.get('temperature') == 20.0
    assert current_conditions_json.get('location_name') == 'London, UK'
    assert hour_forecast_json[0].get('temperature') == 21.0
    assert hour_forecast_json[0].get('location_name') == 'Bristol, UK'
    assert day_forecast_json[0].get('temperature') == 22.0
    assert day_forecast_json[0].get('location_name') == 'San Francisco, USA'


@pytest.mark.django_db
def test_forecast_api_ignore_past_datapoints():
    factory.HourlyForecastDataPointFactory(
        datetime=timezone.now() - datetime.timedelta(hours=2)
    )
    factory.DailyForecastDataPointFactory(
        datetime=timezone.now() - datetime.timedelta(days=2)
    )

    client = Client()
    url = reverse('api_forecast')
    response = client.get(url)
    assert response.status_code == 200

    # Expect a json with the three data points.
    current_conditions_json = response.json().get('current_conditions')
    hour_forecast_json = response.json().get('hourly_forecast')
    day_forecast_json = response.json().get('daily_forecast')
    assert current_conditions_json == {}
    assert len(day_forecast_json) == 0
    assert len(hour_forecast_json) == 0


@pytest.mark.django_db
def test_forecast_api_latest_current_conditions():
    factory.CurrentConditionsForecastDataPointFactory(
        location_name='15 minutes ago',
        datetime=timezone.now() - datetime.timedelta(minutes=10)
    )
    factory.CurrentConditionsForecastDataPointFactory(
        location_name='5 minutes ago',
        datetime=timezone.now() - datetime.timedelta(minutes=5)
    )
    factory.CurrentConditionsForecastDataPointFactory(
        location_name='10 minutes ago',
        datetime=timezone.now() - datetime.timedelta(minutes=10)
    )

    client = Client()
    url = reverse('api_forecast')
    response = client.get(url)
    assert response.status_code == 200

    # Expect a json with the three data points.
    current_conditions_json = response.json().get('current_conditions')
    assert current_conditions_json.get('location_name') == '5 minutes ago'
