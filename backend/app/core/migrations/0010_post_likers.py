# Generated by Django 2.1.5 on 2019-01-30 19:55

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20190130_1805'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='likers',
            field=models.ManyToManyField(blank=True, related_name='likers', to=settings.AUTH_USER_MODEL),
        ),
    ]
