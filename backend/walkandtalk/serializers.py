from rest_framework import serializers
from .models import WalkingEvent, Attendee


class WalkingEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalkingEvent
        fields = [
            'pk',
            'user',
            'title',
            'date',
            'start_time',
            'end_time',
            'description',
            'intensity',
            'is_indoor',
            'timestamp'
        ]


class AttendeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendee
        fields = [
            'user'
        ]
