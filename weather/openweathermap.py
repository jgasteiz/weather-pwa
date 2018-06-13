import json
import os
from datetime import datetime

import pytz
import requests


class WeatherData(object):
    """
    Class to hold the data for a weather data point.

    Sample JSON:
    {
        "clouds": {
            "all": 92
        },
        "coord": {
            "lat": 51.51,
            "lon": -0.13
        },
        "dt": 1528914000,
        "main": {
            "humidity": 52,
            "pressure": 1016,
            "temp": 17.91,
            "temp_max": 19,
            "temp_min": 16
        },
        "name": "London",
        "sys": {
            "country": "GB",
            "sunrise": 1528861375,
            "sunset": 1528921130,
        },
        "weather": [
            {
                "description": "overcast clouds",
                "icon": "04d",
                "id": 804,
                "main": "Clouds"
            }
        ],
        "wind": {
            "deg": 210,
            "speed": 7.2
        }
    }
    """
    def __init__(self, weather_data_json):
        self.all_data = weather_data_json
        self.main_data = weather_data_json.get('main')
        self.sys_data = weather_data_json.get('sys')
        self.weather_data = weather_data_json.get('weather')[0]
        self.wind_data = weather_data_json.get('wind')

    def __str__(self):
        return json.dumps(self.all_data, sort_keys=True, indent=4)

    @property
    def clouds(self):
        return float(self.all_data.get('clouds').get('all') / 100)

    @property
    def coordinates(self):
        return self.all_data.get('coord')

    @property
    def data_time(self):
        utc_datetime = datetime.fromtimestamp(self.all_data.get('dt'), tz=pytz.timezone('UTC'))
        return utc_datetime.astimezone(pytz.timezone('Europe/London'))

    # Main data arguments
    @property
    def temperature(self):
        return self.main_data.get('temp')

    @property
    def temperature_max(self):
        return self.main_data.get('temp_max')

    @property
    def temperature_min(self):
        return self.main_data.get('temp_min')

    @property
    def humidity(self):
        return self.main_data.get('humidity')

    @property
    def pressure(self):
        return self.main_data.get('pressure')

    # Sys arguments
    @property
    def location_name(self):
        return "%s, %s" % (self.all_data.get('name'), self.sys_data.get('country'))

    @property
    def sunrise_time(self):
        return datetime.fromtimestamp(self.sys_data.get('sunrise'))

    @property
    def sunset_time(self):
        return datetime.fromtimestamp(self.sys_data.get('sunset'))

    # Weather arguments
    @property
    def weather_name(self):
        return self.weather_data.get('main')

    @property
    def weather_description(self):
        return self.weather_data.get('description')

    @property
    def weather_icon(self):
        return '//openweathermap.org/img/w/%s.png' % self.weather_data.get('icon')

    # Wind arguments
    @property
    def wind_speed(self):
        return self.wind_data.get('speed')

    @property
    def wind_direction(self):
        return self.wind_data.get('deg')


class ForecastData(object):
    def __init__(self, forecast_data_json):
        pass


class OpenWeatherMapController(object):
    """
    Controller for interacting with the Open Weather Map API.
    """
    # For now, hardcode the London city id. In the future, add the JSON of
    # supported cities to the repo.
    LONDON_CITY_ID = '2643743'

    API_URL = 'http://api.openweathermap.org'
    API_KEY = os.environ.get('API_KEY')

    FORECAST_ENDPOINT = 'data/2.5/forecast?id={city_id}&appid={api_key}&units=metric'
    WEATHER_ENDPOINT = 'data/2.5/weather?id={city_id}&appid={api_key}&units=metric'

    def __init__(self, api_key):
        self.api_key = api_key

    def get_weather(self, city_id=LONDON_CITY_ID):
        """
        Fetch the weather data for the given city id.
        https://openweathermap.org/current
        """
        weather_endpoint = self.WEATHER_ENDPOINT.format(city_id=city_id, api_key=self.api_key)
        res = requests.get('%s/%s' % (self.API_URL, weather_endpoint))
        return WeatherData(res.json())

    def get_forecast(self, city_id=LONDON_CITY_ID):
        """
        Fetch the weather forecast for the given city id.
        https://openweathermap.org/forecast5
        """
        weather_endpoint = self.FORECAST_ENDPOINT.format(city_id=city_id, api_key=self.api_key)
        res = requests.get('%s/%s' % (self.API_URL, weather_endpoint))
        return ForecastData(res.json())
