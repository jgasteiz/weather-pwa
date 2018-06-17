from django.utils import timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response

from accuweather.models import ForecastDataPoint
from accuweather.serializers import ForecastDataPointSerializer


@api_view(['GET'])
def forecast(request):
    qs = ForecastDataPoint.objects.filter(datetime__gt=timezone.now())
    serializer = ForecastDataPointSerializer(qs, many=True)
    return Response(serializer.data)
