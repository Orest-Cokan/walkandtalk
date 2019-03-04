from django.shortcuts import render
from .serializers import WalkingEventSerializer
from .models import WalkingEvent
from rest_framework import viewsets

# Create your views here.


class WalkingEventView(viewsets.ModelViewSet):
    #lookup_field = 'pk'
    serializer_class = WalkingEventSerializer
    queryset = WalkingEvent.objects.all()
    allowed_methods = ["GET", "POST", "PUT"]
