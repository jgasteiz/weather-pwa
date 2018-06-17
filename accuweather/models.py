from django.db import models


class ForecastDataPoint(models.Model):
    datetime = models.DateTimeField()
    location_name = models.CharField(max_length=128, blank=True)
    temperature = models.FloatField(null=True)
    precipitation_probability = models.FloatField(null=True)
    weather_icon = models.CharField(max_length=128, blank=True)
    weather_icon_name = models.CharField(max_length=128, blank=True)
    mobile_link = models.URLField(blank=True)

    class Meta:
        ordering = ['datetime']

    def __repr__(self):
        return '%s | %s | %s' % (self.location_name, self.datetime, self.temperature)

    def __str__(self):
        return '%s | %s | %s' % (self.location_name, self.datetime, self.temperature)
