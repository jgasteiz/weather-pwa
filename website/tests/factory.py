import datetime
import factory
from django.utils import timezone

from weatherservice.models import ForecastDataPoint


class DailyForecastDataPointFactory(factory.DjangoModelFactory):
    class Meta:
        model = ForecastDataPoint

    data_point_type = ForecastDataPoint.DAILY_FORECAST
    datetime = factory.LazyAttribute(lambda a: timezone.now() + datetime.timedelta(days=1))


class HourlyForecastDataPointFactory(factory.DjangoModelFactory):
    class Meta:
        model = ForecastDataPoint

    data_point_type = ForecastDataPoint.HOURLY_FORECAST
    datetime = factory.LazyAttribute(lambda a: timezone.now() + datetime.timedelta(hours=1))


class CurrentConditionsForecastDataPointFactory(factory.DjangoModelFactory):
    class Meta:
        model = ForecastDataPoint

    data_point_type = ForecastDataPoint.CURRENT_CONDITIONS
    datetime = factory.LazyAttribute(lambda a: timezone.now() - datetime.timedelta(minutes=5))
