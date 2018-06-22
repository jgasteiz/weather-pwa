from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response

from weatherservice.models import ForecastDataPoint
from weatherservice.serializers import ForecastDataPointSerializer


@api_view(['GET'])
def forecast(request):
    current_conditions_qs = ForecastDataPoint.objects.filter(
        data_point_type=ForecastDataPoint.CURRENT_CONDITIONS
    )
    current_conditions = {}
    if current_conditions_qs.exists():
        current_conditions_serializer = ForecastDataPointSerializer(current_conditions_qs.last())
        current_conditions = current_conditions_serializer.data

    hourly_forecast_qs = ForecastDataPoint.objects.filter(
        data_point_type=ForecastDataPoint.HOURLY_FORECAST,
        datetime__gt=timezone.now()
    )
    hourly_forecast_serializer = ForecastDataPointSerializer(hourly_forecast_qs, many=True)

    daily_forecast_qs = ForecastDataPoint.objects.filter(
        data_point_type=ForecastDataPoint.DAILY_FORECAST,
        datetime__gt=timezone.now()
    )
    daily_forecast_serializer = ForecastDataPointSerializer(daily_forecast_qs, many=True)

    response_data = {
        'current_conditions': current_conditions,
        'hourly_forecast': hourly_forecast_serializer.data,
        'daily_forecast': daily_forecast_serializer.data,
    }
    return Response(response_data)
