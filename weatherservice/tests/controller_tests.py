import datetime
from unittest import mock

import pytest
import pytz

from weatherservice.models import ForecastDataPoint
from weatherservice.controller import WeatherServiceController
from weatherservice.tests.factory import (
    ActiveLocationFactory,
    CurrentWeatherResponseFaker,
)


@pytest.mark.django_db
@mock.patch('weatherservice.controller.WeatherServiceController.get_current_weather')
def test_fetch_current_weather(mock_get_current_weather):
    ActiveLocationFactory(name='London, UK')
    controller = WeatherServiceController()
    mock_get_current_weather.return_value = mock.Mock()
    fake_current_weather = CurrentWeatherResponseFaker().get_current_weather_response()
    mock_get_current_weather.return_value.json.return_value = fake_current_weather

    # Fetch the weather, expect a ForecastDataPoint to be created.
    fake_data = fake_current_weather[0]
    controller.fetch_current_weather()
    data_point = ForecastDataPoint.objects.get()
    assert data_point.datetime == datetime.datetime.fromtimestamp(fake_data.get('EpochTime'), tz=pytz.timezone('UTC'))
    assert data_point.temperature == fake_data.get('Temperature').get('Metric').get('Value')
    assert data_point.weather_icon == WeatherServiceController.ACCUWEATHER_ICON_MAP[str(fake_data.get('WeatherIcon'))]
    assert data_point.weather_icon_name == fake_data.get('WeatherText')
