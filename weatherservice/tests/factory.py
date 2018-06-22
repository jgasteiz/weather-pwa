import datetime
import random
import time
from random import choice

import factory
from django.utils import timezone
from faker import Faker
from faker.providers import BaseProvider

from weatherservice.controller import WeatherServiceController
from weatherservice.models import ForecastDataPoint


class DailyForecastDataPointFactory(factory.DjangoModelFactory):
    class Meta:
        model = ForecastDataPoint

    data_point_type = ForecastDataPoint.DAILY_FORECAST
    datetime = factory.LazyAttribute(lambda a: timezone.now() + datetime.timedelta(days=1))


class HourlyForecastDataPointFactory(factory.DjangoModelFactory):
    class Meta:
        model = ForecastDataPoint

    data_point_type = ForecastDataPoint.HOURLY_FORECAST
    datetime = factory.LazyAttribute(lambda a: timezone.now() + datetime.timedelta(hours=1))


class CurrentConditionsForecastDataPointFactory(factory.DjangoModelFactory):
    class Meta:
        model = ForecastDataPoint

    data_point_type = ForecastDataPoint.CURRENT_CONDITIONS
    datetime = factory.LazyAttribute(lambda a: timezone.now() - datetime.timedelta(minutes=5))


class WeatherFakerProvider(BaseProvider):
    def get_epoch_time(self):
        return time.time() - random.randint(60, 3600)

    def get_weather_text(self):
        return choice(['Sunny', 'Fallout', 'Rainy', 'Smog', 'Thunderstorm'])

    def get_weather_icon(self):
        return choice([int(icon) for icon in WeatherServiceController.ACCUWEATHER_ICON_MAP.keys()])

    def get_temperature(self):
        return float(random.randint(-40, 40))


class CurrentWeatherResponseFaker(object):
    def get_current_weather_response(self):
        faker = Faker()
        faker.add_provider(WeatherFakerProvider)
        return [
            {
                "EpochTime": faker.get_epoch_time(),
                "WeatherText": faker.get_weather_text(),
                "WeatherIcon": faker.get_weather_icon(),
                "Temperature": {
                    "Metric": {
                        "Value": faker.get_temperature(),
                        "Unit": "C"
                    }
                },
                "MobileLink": "http://m.accuweather.com/en/gb/london/ec4a-2/current-weather/328328",
            }
        ]

    def get_hourly_forecast_response(self):
        pass
