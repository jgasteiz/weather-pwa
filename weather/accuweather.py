import json
import os
from datetime import datetime

import pytz
import requests


class Forecast(object):
    def __init__(self, location_name, forecast_data):
        self.forecast_data_point_list = [
            ForecastDataPoint(location_name, data_point)
            for data_point in forecast_data
        ]

    def get_data(self):
        return [
            data_point.get_data()
            for data_point in self.forecast_data_point_list
        ]


class ForecastDataPoint(object):
    """
    Class to hold the data for a weather data point.

    Sample JSON:
    {
        "EpochDateTime": 1528995600,
        "WeatherIcon": 2,
        "IconPhrase": "Mostly sunny",
        "IsDaylight": true,
        "Temperature": {
            "Value": 21.6,
            "Unit": "C",
            "UnitType": 17
        },
        "PrecipitationProbability": 7,
        "MobileLink": "http://m.accuweather.com/en/gb/london/ec4a-2/hourly-weather-forecast/328328?day=1&unit=c&lang=en-gb",
        "Link": "http://www.accuweather.com/en/gb/london/ec4a-2/hourly-weather-forecast/328328?day=1&hbhhour=18&unit=c&lang=en-gb"
    },
    """
    def __init__(self, location_name, forecast_data_point):
        self.location_name = location_name
        self.all_data = forecast_data_point

    def __repr__(self):
        return '%s, %s' % self.location_name, self.temperature

    def __str__(self):
        return json.dumps(self.all_data, sort_keys=True, indent=4)

    def get_data(self):
        return {
            'location_name': self.location_name,
            'data_time': self.datetime.strftime('%B %d, %H:%M'),
            'temperature': self.temperature,
            'precipitation_probability': self.precipitation_probability,
            'weather_icon': self.weather_icon,
            'weather_name': self.weather_icon_name,
            'mobile_link': self.mobile_link,
        }

    @property
    def datetime(self):
        utc_datetime = datetime.fromtimestamp(self.all_data.get('EpochDateTime'), tz=pytz.timezone('UTC'))
        return utc_datetime.astimezone(pytz.timezone('Europe/London'))

    @property
    def temperature(self):
        return self.all_data.get('Temperature').get('Value')

    @property
    def precipitation_probability(self):
        return self.all_data.get('PrecipitationProbability')

    @property
    def weather_icon(self):
        weather_icon = str(self.all_data.get('WeatherIcon'))
        if len(weather_icon) == 1:
            weather_icon = '0%s' % weather_icon
        return 'https://developer.accuweather.com/sites/default/files/%s-s.png' % weather_icon

    @property
    def weather_icon_name(self):
        return self.all_data.get('IconPhrase')

    @property
    def mobile_link(self):
        return self.all_data.get('MobileLink')


class AccuWeatherController(object):
    """
    Controller for interacting with the Open Weather Map API.
    """
    # For now, hardcode the London city id. In the future, integrate with the
    # accuweather locations endpoint.
    LONDON_CITY_ID = '328328'

    API_URL = 'http://dataservice.accuweather.com'

    FORECAST_ENDPOINT = 'forecasts/v1/hourly/12hour/{city_id}?apikey={api_key}&units=metric&language=en-gb&metric=true'

    def __init__(self):
        self.api_key = os.environ.get('ACCUWEATHER_API_KEY')

    def get_forecast(self, city_id=LONDON_CITY_ID):
        """
        Fetch the forecast data for the given city id.
        https://developer.accuweather.com/accuweather-forecast-api/apis/get/forecasts/v1/hourly/12hour/%7BlocationKey%7D
        """
        forecast_endpoint = self.FORECAST_ENDPOINT.format(city_id=city_id, api_key=self.api_key)
        forecast_url = '%s/%s' % (self.API_URL, forecast_endpoint)
        res = requests.get(forecast_url)
        return Forecast('London, UK', res.json())

    def get_forecast_json(self, city_id=LONDON_CITY_ID):
        """
        Fetch the forecast data for the given city id and return its data
        in json format.
        """
        return json.dumps(self.get_forecast(city_id).get_data())
