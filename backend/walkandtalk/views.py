from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .api.serializers import WalkingEventSerializer
from .models import WalkingEvent

# Create your views here.


class WalkingEventListView(viewsets.ModelViewSet):
    queryset = WalkingEvent.objects.all()
    serializer_class = WalkingEventSerializer
