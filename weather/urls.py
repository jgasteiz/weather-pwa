from django.conf.urls import include, url
from django.contrib import admin
from django.urls import path

from website import api
from website import tasks
from website import views


admin.autodiscover()


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/forecast', api.forecast, name='forecast'),
    url(r'^tasks/forecast', tasks.fetch_forecast, name='fetch_forecast'),
    path('admin/', admin.site.urls),
]
