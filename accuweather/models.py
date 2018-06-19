import pytz
from django.conf import settings
from django.db import models


class ForecastDataPoint(models.Model):
    HOURLY_FORECAST = 'HOURLY_FORECAST'
    DAILY_FORECAST = 'DAILY_FORECAST'
    CURRENT_CONDITIONS = 'CURRENT_CONDITIONS'
    DATA_POINT_TYPES = (
        (HOURLY_FORECAST, 'Hourly Forecast'),
        (DAILY_FORECAST, 'Daily Forecast'),
        (CURRENT_CONDITIONS, 'Current conditions'),
    )

    datetime = models.DateTimeField()
    location_name = models.CharField(max_length=128, blank=True)
    temperature = models.FloatField(null=True, default=0)
    temperature_min = models.FloatField(null=True, default=0)
    temperature_max = models.FloatField(null=True, default=0)
    weather_icon = models.CharField(max_length=128, blank=True)
    weather_icon_name = models.CharField(max_length=128, blank=True)
    mobile_link = models.URLField(blank=True)
    data_point_type = models.CharField(choices=DATA_POINT_TYPES, default=HOURLY_FORECAST, max_length=32)

    class Meta:
        ordering = ['datetime']

    def __repr__(self):
        return '%s | %s | %s' % (self.location_name, self.datetime, self.temperature)

    def __str__(self):
        return '%s | %s | %s' % (self.location_name, self.datetime, self.temperature)

    @property
    def localized_datetime(self):
        return self.datetime.astimezone(pytz.timezone(settings.TIME_ZONE))
