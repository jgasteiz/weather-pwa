from rest_framework import serializers

from .models import ForecastDataPoint


class ForecastDataPointSerializer(serializers.ModelSerializer):
    datapoint_hour = serializers.SerializerMethodField()
    datapoint_date = serializers.SerializerMethodField()
    datapoint_time = serializers.SerializerMethodField()

    class Meta:
        model = ForecastDataPoint
        fields = (
            'datapoint_hour',
            'datapoint_date',
            'datapoint_time',
            'data_point_type',
            'location_name',
            'temperature',
            'temperature_min',
            'temperature_max',
            'weather_icon',
            'weather_icon_name',
            'mobile_link',
        )

    def get_datapoint_hour(self, obj):
        return obj.localized_datetime.strftime('%H:%M')

    def get_datapoint_date(self, obj):
        return obj.localized_datetime.strftime('%B %d')

    def get_datapoint_time(self, obj):
        return obj.localized_datetime.strftime('%B %d, %H:%M')