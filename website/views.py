from django.http import HttpResponse
from django.shortcuts import render

from weather.accuweather import AccuWeatherController


def index(request):
    return render(request, 'index.html')


def forecast(request):
    forecast_controller = AccuWeatherController()
    return HttpResponse(forecast_controller.get_forecast_json(), content_type='application/json')
