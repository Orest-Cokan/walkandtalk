from django.db import models

# Create your models here.

#  A model for walking events


class WalkingEvent(models.Model):
    organizer = models.CharField()
    event_title = models.CharField()
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    description = models.CharField()
    intensity = models.CharField()
    is_indoor = models.BooleanField(default=False)
    location = models.CharField()

    def __str__(self):
        return self.title
