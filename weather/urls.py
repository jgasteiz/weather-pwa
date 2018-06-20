from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path
from django.views.decorators.cache import cache_control
from django.views.generic import TemplateView

from website import api
from website import tasks
from website import views


admin.autodiscover()


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/forecast', api.forecast, name='forecast'),
    url(r'^tasks/forecast', tasks.fetch_forecast, name='fetch_forecast'),
    url(r'^service-worker.js', cache_control(max_age=2592000)(TemplateView.as_view(
        template_name="service-worker.js",
        content_type='application/javascript',
    )), name='service-worker.js'),
    path('admin/', admin.site.urls),
]
