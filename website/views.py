import json
import os

import requests
from django.shortcuts import render

OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org'
WEATHER_ENDPOINT = 'data/2.5/weather?q={query}&appid={app_id}'
APP_ID = os.environ.get('APP_ID')


def index(request):
    query = request.GET.get('q', 'London,UK')
    weather_endpoint = WEATHER_ENDPOINT.format(query=query, app_id=APP_ID)
    res = requests.get('%s/%s' % (OPEN_WEATHER_MAP_URL, weather_endpoint))
    pretty_response = json.dumps(res.json(), sort_keys=True, indent=4)
    return render(request, 'index.html', context={'weather_data': pretty_response})
