from django.core.management.base import BaseCommand

from accuweather.controller import AccuWeatherController


class Command(BaseCommand):
    help = 'Fetch the latest forecast data.'

    def handle(self, *args, **kwargs):
        forecast_controller = AccuWeatherController()
        forecast_controller.fetch_current_weather()
        forecast_controller.fetch_hourly_forecast()
        forecast_controller.fetch_daily_forecast()
        self.stdout.write(self.style.SUCCESS('The forecast has been updated.'))
