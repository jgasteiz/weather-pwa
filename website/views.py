import json
import os

from django.http import HttpResponse
from django.shortcuts import render

from weather.openweathermap import OpenWeatherMapController


def index(request):
    return render(request, 'index.html')


def weather(request):
    weather_controller = OpenWeatherMapController(os.environ.get('API_KEY'))
    return HttpResponse(weather_controller.get_weather_json(), content_type='application/json')
