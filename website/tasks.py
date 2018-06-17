from django.http import HttpResponse

from accuweather.controller import AccuWeatherController


def fetch_forecast(request):
    forecast_controller = AccuWeatherController()
    forecast_controller.fetch_forecast()
    return HttpResponse('Ok')
