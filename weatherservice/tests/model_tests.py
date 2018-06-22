import datetime
from unittest import mock

import pytest
import pytz

from . import factory


@pytest.mark.django_db
def test_localized_datetime():
    data_point = factory.CurrentConditionsForecastDataPointFactory(
        datetime=datetime.datetime(2018, 6, 22, tzinfo=pytz.timezone('UTC'))
    )
    with mock.patch('weatherservice.models.settings.TIME_ZONE', 'Europe/Madrid'):
        assert data_point.localized_datetime == data_point.datetime.astimezone(pytz.timezone('Europe/Madrid'))
