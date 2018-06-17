from rest_framework import serializers

from .models import ForecastDataPoint


class ForecastDataPointSerializer(serializers.ModelSerializer):
    data_hour = serializers.SerializerMethodField()
    data_time = serializers.SerializerMethodField()

    class Meta:
        model = ForecastDataPoint
        fields = (
            'data_hour',
            'data_time',
            'location_name',
            'temperature',
            'precipitation_probability',
            'weather_icon',
            'weather_icon_name',
            'mobile_link',
        )

    def get_data_hour(self, obj):
        return obj.datetime.strftime('%H:%M'),

    def get_data_time(self, obj):
        return obj.datetime.strftime('%B %d, %H:%M')
