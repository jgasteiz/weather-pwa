from django.conf.urls import include, url
from django.urls import path

from django.contrib import admin
admin.autodiscover()

from website import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^api/weather', views.weather, name='weather'),
    path('admin/', admin.site.urls),
]
