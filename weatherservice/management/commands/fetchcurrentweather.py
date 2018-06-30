from django.core.management.base import BaseCommand

from weatherservice.controller import WeatherServiceController


class Command(BaseCommand):
    help = 'Fetch the latest current weather conditions data.'

    def handle(self, *args, **kwargs):
        forecast_controller = WeatherServiceController()
        forecast_controller.fetch_current_weather()
