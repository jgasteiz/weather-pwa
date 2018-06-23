# Generated by Django 2.0.6 on 2018-06-19 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weatherservice', '0005_auto_20180619_1856'),
    ]

    operations = [
        migrations.AlterField(
            model_name='forecastdatapoint',
            name='data_point_type',
            field=models.CharField(choices=[('HOURLY_FORECAST', 'Hourly Forecast'), ('DAILY_FORECAST', 'Daily Forecast'), ('CURRENT_CONDITIONS', 'Current conditions')], default='HOURLY_FORECAST', max_length=32),
        ),
    ]