from django.conf.urls import url
from django.contrib import admin
from django.urls import path
from django.views.decorators.cache import cache_control
from django.views.generic import TemplateView

from website import api
from website import tasks
from website import views


admin.autodiscover()


urlpatterns = [
    # Views
    url(r'^$', views.index, name='index'),

    # API
    url(r'^api/forecast', api.forecast, name='api_forecast'),

    # Tasks
    url(r'^tasks/forecast', tasks.fetch_forecast, name='fetch_forecast'),

    # Admin
    path('admin/', admin.site.urls),

    # Service worker url hack.
    url(r'^service-worker.js',
        cache_control(max_age=2592000)(TemplateView.as_view(
            template_name="service-worker.js",
            content_type='application/javascript',
        )), name='service-worker.js'),
]
