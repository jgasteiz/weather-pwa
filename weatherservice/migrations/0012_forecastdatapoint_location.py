# Generated by Django 2.0.6 on 2018-06-23 11:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('weatherservice', '0011_auto_20180623_1158'),
    ]

    operations = [
        migrations.AddField(
            model_name='forecastdatapoint',
            name='location',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='weatherservice.Location'),
        ),
    ]
