# Generated by Django 2.0.6 on 2018-06-17 18:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accuweather', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='forecastdatapoint',
            name='mobile_link',
            field=models.URLField(blank=True),
        ),
        migrations.AlterField(
            model_name='forecastdatapoint',
            name='precipitation_probability',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='forecastdatapoint',
            name='temperature',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='forecastdatapoint',
            name='weather_icon',
            field=models.CharField(blank=True, max_length=128),
        ),
        migrations.AlterField(
            model_name='forecastdatapoint',
            name='weather_icon_name',
            field=models.CharField(blank=True, max_length=128),
        ),
    ]