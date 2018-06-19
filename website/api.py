from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response

from accuweather.models import ForecastDataPoint
from accuweather.serializers import ForecastDataPointSerializer


@api_view(['GET'])
def forecast(request):
    forecast_qs = ForecastDataPoint.objects.filter(datetime__gt=timezone.now())
    forecast_serializer = ForecastDataPointSerializer(forecast_qs, many=True)
    current_conditions_qs = ForecastDataPoint.objects.filter(data_point_type=ForecastDataPoint.CURRENT_CONDITIONS).last()
    current_weather_serializer = ForecastDataPointSerializer(current_conditions_qs)
    return Response([current_weather_serializer.data] + forecast_serializer.data)
