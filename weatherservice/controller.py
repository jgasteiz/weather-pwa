import logging
import os
from datetime import datetime

import pytz
import requests
from django.conf import settings

from .models import ForecastDataPoint, Location


class WeatherServiceController(object):
    """
    Controller for interacting with the Open Weather Map API.
    """
    CURRENT_CONDITIONS_ENDPOINT = 'https://api.openweathermap.org/data/2.5/weather?id={city_id}&appid={api_key}&units=metric'
    DAILY_FORECAST_ENDPOINT = 'https://www.metaweather.com/api/location/{city_id}/'
    HOURLY_FORECAST_ENDPOINT = 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/{city_id}?apikey={api_key}&units=metric&language=en-gb&metric=true'

    ACCUWEATHER_ICON_MAP = {
        '1': 'wi-day-sunny',
        '2': 'wi-day-sunny',
        '3': 'wi-day-sunny',
        '4': 'wi-day-sunny',
        '5': 'wi-day-haze',
        '6': 'wi-day-cloudy',
        '7': 'wi-cloudy',
        '8': 'wi-cloudy',
        '11': 'wi-fog',
        '12': 'wi-showers',
        '13': 'wi-showers',
        '14': 'wi-day-showers',
        '15': 'wi-storm-showers',
        '16': 'wi-storm-showers',
        '17': 'wi-day-thunderstorm',
        '18': 'wi-rain',
        '19': 'wi-rain-mix',
        '20': 'wi-day-rain-mix',
        '21': 'wi-day-rain-mix',
        '22': 'wi-snow',
        '23': 'wi-day-snow',
        '24': 'wi-snow',
        '25': 'wi-sleet',
        '26': 'wi-rain-mix',
        '29': 'wi-snow',
        '30': 'wi-hot',
        '31': 'wi-snowflake-cold',
        '32': 'wi-windy',
        '33': 'wi-night-clear',
        '34': 'wi-night-clear',
        '35': 'wi-night-alt-cloudy',
        '36': 'wi-night-alt-cloudy',
        '37': 'wi-night-fog',
        '38': 'wi-night-alt-cloudy',
        '39': 'wi-night-alt-rain',
        '40': 'wi-night-alt-rain',
        '41': 'wi-night-alt-storm-showers',
        '42': 'wi-night-alt-storm-showers',
        '43': 'wi-night-sleet',
        '44': 'wi-night-snow',
    }
    METAWEATHER_ICON_MAP = {
        'sn': 'wi-snow',
        'sl': 'wi-sleet',
        'h': 'wi-hail',
        't': 'wi-day-thunderstorm',
        'hr': 'wi-rain',
        'lr': 'wi-raindrops',
        's': 'wi-showers',
        'hc': 'wi-cloudy',
        'lc': 'wi-cloud',
        'c': 'wi-day-sunny',
    }
    OPENWEATHERMAP_ICON_MAP = {
        '01d': 'wi-day-sunny',
        '02d': 'wi-day-cloudy',
        '03d': 'wi-cloudy',
        '04d': 'wi-cloudy',
        '09d': 'wi-rain',
        '10d': 'wi-day-rain',
        '11d': 'wi-thunderstorm',
        '13d': 'wi-snow',
        '50d': 'wi-fog',
        '01n': 'wi-night-clear',
        '02n': 'wi-night-cloudy',
        '03n': 'wi-cloudy',
        '04n': 'wi-cloudy',
        '09n': 'wi-rain',
        '10n': 'wi-night-rain',
        '11n': 'wi-night-alt-thunderstorm',
        '13n': 'wi-snow',
        '50n': 'wi-fog',
    }

    def __init__(self):
        self.accuweather_api_key = os.environ.get("ACCUWEATHER_API_KEY")
        self.openweathermap_api_key = os.environ.get("OPENMAPWEATHER_API_KEY")
        self.active_location = Location.get_active_location()

    def get_current_weather(self, city_id):
        """
        Get the current weather data from AccuWeather.
        """
        current_conditions_endpoint = self.CURRENT_CONDITIONS_ENDPOINT.format(city_id=city_id, api_key=self.openweathermap_api_key)
        res = requests.get(current_conditions_endpoint)
        if res.status_code != 200:
            error_msg = "Couldn't fetch the current weather. Reason: %s" % res.json()
            logging.error(error_msg)
            raise Exception(error_msg)
        return res

    def get_hourly_forecast(self, city_id):
        """
        Get a forecast for the next 12 hours from AccuWeather.
        """
        forecast_endpoint = self.HOURLY_FORECAST_ENDPOINT.format(city_id=city_id, api_key=self.accuweather_api_key)
        res = requests.get(forecast_endpoint)
        if res.status_code != 200:
            error_msg = "Couldn't fetch the hourly forecast. Reason: %s" % res.json()
            logging.error(error_msg)
            raise Exception(error_msg)
        return res

    def get_daily_forecast(self, city_id):
        """
        Get a forecast for the next 5 days from MetaWeather.
        """
        forecast_endpoint = self.DAILY_FORECAST_ENDPOINT.format(city_id=city_id)
        res = requests.get(forecast_endpoint)
        if res.status_code != 200:
            error_msg = "Couldn't fetch the daily forecast. Reason: %s" % res.json()
            logging.error(error_msg)
            raise Exception(error_msg)
        return res

    def fetch_current_weather(self):
        """
        Create or update a ForecastDataPoint for the current weather.
        """
        current_conditions_data = self.get_current_weather(self.active_location.openweathermap_location_id)
        data_point = current_conditions_data.json()
        utc_datetime = datetime.fromtimestamp(data_point.get('dt'), tz=pytz.timezone('UTC'))
        data_point_datetime = utc_datetime.astimezone(pytz.timezone(settings.TIME_ZONE))
        forecast, _ = ForecastDataPoint.objects.get_or_create(
            location=self.active_location,
            datetime=data_point_datetime,
            data_point_type=ForecastDataPoint.CURRENT_CONDITIONS,
        )
        forecast.temperature = data_point.get('main').get('temp')
        forecast.weather_icon = self.OPENWEATHERMAP_ICON_MAP.get(data_point.get('weather')[0].get('icon'))
        forecast.weather_icon_name = data_point.get('weather')[0].get('main')
        forecast.save()

    def fetch_hourly_forecast(self):
        """
        Create or update a bunch of ForecastDataPoint for the next 12 hours.
        """
        forecast_data = self.get_hourly_forecast(self.active_location.accuweather_location_id).json()
        for data_point in forecast_data:
            utc_datetime = datetime.fromtimestamp(data_point.get('EpochDateTime'), tz=pytz.timezone('UTC'))
            data_point_datetime = utc_datetime.astimezone(pytz.timezone(settings.TIME_ZONE))
            forecast, _ = ForecastDataPoint.objects.get_or_create(
                location=self.active_location,
                datetime=data_point_datetime.replace(minute=0, second=0),
                data_point_type=ForecastDataPoint.HOURLY_FORECAST,
            )
            forecast.temperature = data_point.get('Temperature').get('Value')
            forecast.weather_icon = self.ACCUWEATHER_ICON_MAP.get(str(data_point.get('WeatherIcon')))
            forecast.weather_icon_name = data_point.get('IconPhrase')
            forecast.save()

    def fetch_daily_forecast(self):
        """
        Create or update a bunch of ForecastDataPoint for the next 5 days.
        """
        forecast_data = self.get_daily_forecast(self.active_location.metaweather_location_id).json()
        consolidated_weather = forecast_data.get('consolidated_weather')
        for data_point in consolidated_weather:
            utc_datetime = datetime.strptime(data_point.get('applicable_date'), '%Y-%m-%d')
            data_point_datetime = utc_datetime.astimezone(pytz.timezone(settings.TIME_ZONE))
            forecast, _ = ForecastDataPoint.objects.get_or_create(
                location=self.active_location,
                datetime=data_point_datetime.replace(hour=0, minute=0, second=0),
                data_point_type=ForecastDataPoint.DAILY_FORECAST,
            )
            forecast.temperature_min = int(data_point.get('min_temp'))
            forecast.temperature_max = int(data_point.get('max_temp'))
            forecast.weather_icon = self.METAWEATHER_ICON_MAP.get(data_point.get('weather_state_abbr'))
            forecast.weather_icon_name = data_point.get('weather_state_name')
            forecast.save()
