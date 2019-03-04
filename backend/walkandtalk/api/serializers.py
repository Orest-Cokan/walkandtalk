from rest_framework import serializers
from walkandtalk.models import WalkingEvent


class WalkingEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = WalkingEvent
        fields = {
            'organizer',
            'event_title',
            'date',
            'start_time',
            'end_time',
            'is_indoor',
            'location'
        }
