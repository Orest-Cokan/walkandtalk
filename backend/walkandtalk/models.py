from django.db import models
from django.conf import settings
# Create your models here.


class Attendee(models.Model):
    user = models.CharField(max_length=100)

    def __str_(self):
        return self.user


class WalkingEvent(models.Model):
    # pk the ID --> integer/number
    user = models.CharField(max_length=100)
    title = models.CharField(max_length=30, null=False,
                             blank=False, primary_key=True)
    date = models.DateField()
    start_time = models.CharField(max_length=50)
    end_time = models.CharField(max_length=50)
    description = models.CharField(max_length=300, null=False, blank=False)
    intensity = models.CharField(max_length=30, null=False, blank=False)
    is_indoor = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    #attendee = models.ManyToManyField(to=Attendee, blank=True)

    def __str__(self):
        return self.user
