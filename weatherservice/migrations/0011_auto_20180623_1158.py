# Generated by Django 2.0.6 on 2018-06-23 10:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('weatherservice', '0010_location_active_location'),
    ]

    operations = [
        migrations.RenameField(
            model_name='location',
            old_name='active_location',
            new_name='is_active',
        ),
    ]