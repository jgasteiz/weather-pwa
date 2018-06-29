from django.contrib import admin

from .models import ForecastDataPoint, Location


admin.site.register(ForecastDataPoint)
admin.site.register(Location)
