import pytz
from django.conf import settings
from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=64)
    accuweather_location_id = models.CharField(max_length=64, blank=True)
    metaweather_location_id = models.CharField(max_length=64, blank=True)
    openweathermap_location_id = models.CharField(max_length=64, blank=True)
    # HACK: for now, this will determine which is the active location in the UI.
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return '%s | Active: %s' % (self.name, self.is_active)

    @classmethod
    def get_active_location(cls):
        active_locations = cls.objects.filter(is_active=True)
        assert active_locations.exists()
        return active_locations.first()


class ForecastDataPoint(models.Model):
    HOURLY_FORECAST = 'HOURLY_FORECAST'
    DAILY_FORECAST = 'DAILY_FORECAST'
    CURRENT_CONDITIONS = 'CURRENT_CONDITIONS'
    DATA_POINT_TYPES = (
        (HOURLY_FORECAST, 'Hourly Forecast'),
        (DAILY_FORECAST, 'Daily Forecast'),
        (CURRENT_CONDITIONS, 'Current conditions'),
    )

    location = models.ForeignKey(Location, null=True, on_delete=models.CASCADE)
    datetime = models.DateTimeField()
    temperature = models.FloatField(null=True, default=0)
    temperature_min = models.FloatField(null=True, default=0)
    temperature_max = models.FloatField(null=True, default=0)
    weather_icon = models.CharField(max_length=128, blank=True)
    weather_icon_name = models.CharField(max_length=128, blank=True)
    data_point_type = models.CharField(choices=DATA_POINT_TYPES, default=HOURLY_FORECAST, max_length=32)

    class Meta:
        ordering = ['datetime']

    def __repr__(self):
        return '%s | %s | %s' % (self.location_name, self.datetime, self.temperature)

    def __str__(self):
        return '%s | %s | %s' % (self.location_name, self.datetime, self.temperature)

    @property
    def location_name(self):
        return self.location.name if self.location else 'N/A'

    @property
    def localized_datetime(self):
        return self.datetime.astimezone(pytz.timezone(settings.TIME_ZONE))
