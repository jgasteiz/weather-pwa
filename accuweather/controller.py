import os
from datetime import datetime

import pytz
import requests
from django.conf import settings

from .models import ForecastDataPoint


class AccuWeatherController(object):
    """
    Controller for interacting with the Open Weather Map API.
    """
    # For now, hardcode the London city id. In the future, integrate with the
    # accuweather locations endpoint.
    LONDON_CITY_ID = '328328'
    LOCATION_NAME = 'London, UK'

    API_URL = 'http://dataservice.accuweather.com'

    FORECAST_ENDPOINT = 'forecasts/v1/hourly/12hour/{city_id}?apikey={api_key}&units=metric&language=en-gb&metric=true'
    CURRENT_CONDITIONS_ENDPOINT = 'currentconditions/v1/{city_id}?apikey={api_key}&units=metric&language=en-gb&metric=true'

    ICON_MAP = {
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

    def __init__(self):
        self.api_key = os.environ.get('ACCUWEATHER_API_KEY')

    def fetch_forecast(self, city_id=LONDON_CITY_ID):
        forecast_endpoint = self.FORECAST_ENDPOINT.format(city_id=city_id, api_key=self.api_key)
        forecast_url = '%s/%s' % (self.API_URL, forecast_endpoint)
        forecast_data = requests.get(forecast_url).json()

        # Fetch the forecast for the next 12 hours, update the forecast data points.
        for data_point in forecast_data:
            utc_datetime = datetime.fromtimestamp(data_point.get('EpochDateTime'), tz=pytz.timezone('UTC'))
            data_point_datetime = utc_datetime.astimezone(pytz.timezone(settings.TIME_ZONE))
            forecast, _ = ForecastDataPoint.objects.get_or_create(datetime=data_point_datetime)
            forecast.data_point_type = ForecastDataPoint.FORECAST
            forecast.location_name = self.LOCATION_NAME
            forecast.temperature = data_point.get('Temperature').get('Value')
            forecast.precipitation_probability = data_point.get('PrecipitationProbability')
            forecast.weather_icon = self.ICON_MAP.get(str(data_point.get('WeatherIcon')))
            forecast.weather_icon_name = data_point.get('IconPhrase')
            forecast.mobile_link = data_point.get('MobileLink')
            forecast.save()

    def fetch_current_weather(self, city_id=LONDON_CITY_ID):
        """
        Create or update a ForecastDataPoint for the current weather.
        """
        current_conditions_endpoint = self.CURRENT_CONDITIONS_ENDPOINT.format(city_id=city_id, api_key=self.api_key)
        current_conditions_url = '%s/%s' % (self.API_URL, current_conditions_endpoint)
        current_conditions_data = requests.get(current_conditions_url).json()

        data_point = current_conditions_data[0]
        utc_datetime = datetime.fromtimestamp(data_point.get('EpochTime'), tz=pytz.timezone('UTC'))
        data_point_datetime = utc_datetime.astimezone(pytz.timezone(settings.TIME_ZONE))
        forecast, _ = ForecastDataPoint.objects.get_or_create(datetime=data_point_datetime)
        forecast.data_point_type = ForecastDataPoint.CURRENT_CONDITIONS
        forecast.location_name = self.LOCATION_NAME
        forecast.temperature = data_point.get('Temperature').get('Metric').get('Value')
        forecast.weather_icon = self.ICON_MAP.get(str(data_point.get('WeatherIcon')))
        forecast.weather_icon_name = data_point.get('WeatherText')
        forecast.mobile_link = data_point.get('MobileLink')
        forecast.save()
