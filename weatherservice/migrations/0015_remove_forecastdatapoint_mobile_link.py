# Generated by Django 2.0.7 on 2018-07-25 18:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('weatherservice', '0014_location_openweathermap_location_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='forecastdatapoint',
            name='mobile_link',
        ),
    ]
