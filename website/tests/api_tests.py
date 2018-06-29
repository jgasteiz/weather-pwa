import datetime

import pytest
import pytz
from django.conf import settings
from django.test import Client
from django.urls import reverse
from django.utils import timezone

from weatherservice.tests import factory


@pytest.mark.django_db
def test_forecast_api_basic():
    active_location = factory.ActiveLocationFactory(name='London, UK')
    # Create a few FactoryDataPoints
    factory.CurrentConditionsForecastDataPointFactory(
        location=active_location,
        temperature=20
    )
    factory.HourlyForecastDataPointFactory(
        location=active_location,
        temperature=21
    )
    factory.DailyForecastDataPointFactory(
        location=active_location,
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
    assert hour_forecast_json[0].get('location_name') == 'London, UK'
    assert day_forecast_json[0].get('temperature') == 22.0
    assert day_forecast_json[0].get('location_name') == 'London, UK'


@pytest.mark.django_db
def test_forecast_api_ignore_past_datapoints():
    active_location = factory.ActiveLocationFactory(name='London, UK')
    factory.HourlyForecastDataPointFactory(
        location=active_location,
        datetime=timezone.now() - datetime.timedelta(hours=2)
    )
    factory.DailyForecastDataPointFactory(
        location=active_location,
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
    active_location = factory.ActiveLocationFactory(name='London, UK')
    five_mins_ago = timezone.now() - datetime.timedelta(minutes=5)
    factory.CurrentConditionsForecastDataPointFactory(
        location=active_location,
        datetime=timezone.now() - datetime.timedelta(minutes=10)
    )
    factory.CurrentConditionsForecastDataPointFactory(
        location=active_location,
        datetime=five_mins_ago
    )
    factory.CurrentConditionsForecastDataPointFactory(
        location=active_location,
        datetime=timezone.now() - datetime.timedelta(minutes=10)
    )

    client = Client()
    url = reverse('api_forecast')
    response = client.get(url)
    assert response.status_code == 200

    # Expect a json with the three data points.
    current_conditions_json = response.json().get('current_conditions')
    assert current_conditions_json.get('datapoint_time') == five_mins_ago.astimezone(pytz.timezone(settings.TIME_ZONE)).strftime('%B %d, %H:%M')
