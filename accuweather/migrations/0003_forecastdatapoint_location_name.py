# Generated by Django 2.0.6 on 2018-06-17 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accuweather', '0002_auto_20180617_1913'),
    ]

    operations = [
        migrations.AddField(
            model_name='forecastdatapoint',
            name='location_name',
            field=models.CharField(blank=True, max_length=128),
        ),
    ]