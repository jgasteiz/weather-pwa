# Generated by Django 2.0.6 on 2018-06-30 13:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('weatherservice', '0013_auto_20180629_2337'),
    ]

    operations = [
        migrations.AddField(
            model_name='location',
            name='openweathermap_location_id',
            field=models.CharField(blank=True, max_length=64),
        ),
    ]
