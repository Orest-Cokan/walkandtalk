# Generated by Django 2.1.5 on 2019-03-04 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('walkandtalk', '0004_auto_20190303_2254'),
    ]

    operations = [
        migrations.CreateModel(
            name='Attendee',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='walkingevent',
            name='attendee',
            field=models.ManyToManyField(blank=True, to='walkandtalk.Attendee'),
        ),
    ]
