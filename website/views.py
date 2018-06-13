import os

from django.shortcuts import render

from weather.openweathermap import OpenWeatherMapController


def index(request):
    weather_controller = OpenWeatherMapController(os.environ.get('API_KEY'))
    context = {'weather_data': weather_controller.get_weather()}
    return render(request, 'index.html', context=context)
