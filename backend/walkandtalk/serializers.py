from rest_framework import serializers
from .models import WalkingEvent, Attendance


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


class AttendeanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = [
            'user'
        ]
