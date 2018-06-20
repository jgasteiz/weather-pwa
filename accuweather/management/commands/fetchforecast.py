import pytz
from django.conf import settings
from django.core.management.base import BaseCommand
from django.utils import timezone

from accuweather.controller import AccuWeatherController


class Command(BaseCommand):
    """
    There's a limit of 50 free API calls to the AccuWeather API, so we want to
    define some "API call windows":
    - current weather + next 12 hour forecast: between 6 and 21.
    - daily forecast for the next 5 days: between 6 and 7.
    """
    help = 'Fetch the latest forecast data.'

    # Fetch the hourly forecast and current weather between 6 and 22.
    CURRENT_FORECAST_WINDOW_STARTS = 6
    CURRENT_FORECAST_WINDOW_ENDS = 21
    # Only fetch the daily forecast between 6 and 7 in the morning.
    DAILY_FORECAST_WINDOW_STARTS = 6
    DAILY_FORECAST_WINDOW_ENDS = 7

    def handle(self, *args, **kwargs):
        now = timezone.now().astimezone(pytz.timezone(settings.TIME_ZONE))
        forecast_controller = AccuWeatherController()

        try:
            # Check if we should fetch the current weather data.
            if self.CURRENT_FORECAST_WINDOW_STARTS <= now.hour <= self.CURRENT_FORECAST_WINDOW_ENDS:
                forecast_controller.fetch_current_weather()
                forecast_controller.fetch_hourly_forecast()
                self.stdout.write(self.style.SUCCESS('The current weather and hourly forecast has been updated.'))

            # Check if we should fetch the daily weather forecast.
            if self.DAILY_FORECAST_WINDOW_STARTS <= now.hour <= self.DAILY_FORECAST_WINDOW_ENDS:
                forecast_controller.fetch_daily_forecast()
                self.stdout.write(self.style.SUCCESS('The daily forecast has been updated.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(e))
