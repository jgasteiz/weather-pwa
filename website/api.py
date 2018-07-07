from rest_framework.decorators import api_view
from rest_framework.response import Response

from website.utils import get_weather_json_data


@api_view(['GET'])
def forecast(request):
    return Response(get_weather_json_data())
