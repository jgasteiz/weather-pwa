from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response

from weatherservice.models import ForecastDataPoint, Location
from weatherservice.serializers import HistoricDataPointSerializer
from website.utils import get_weather_json_data


@api_view(['GET'])
def forecast(request):
    return Response(get_weather_json_data())


class HistoricDataView(generics.ListAPIView):
    serializer_class = HistoricDataPointSerializer

    def get_queryset(self):
        active_location = Location.get_active_location()
        return ForecastDataPoint.objects.filter(
            location=active_location,
            data_point_type=ForecastDataPoint.CURRENT_CONDITIONS
        )
