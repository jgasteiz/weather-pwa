# Generated by Django 2.0.6 on 2018-06-29 22:37

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('weatherservice', '0012_forecastdatapoint_location'),
    ]

    operations = [
        migrations.RenameField(
            model_name='location',
            old_name='location_name',
            new_name='name',
        ),
        migrations.RemoveField(
            model_name='forecastdatapoint',
            name='location_name',
        ),
    ]