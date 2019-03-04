from walkandtalk.models import WalkingEvent
from .serializers import WalkingEventSerializer
from rest_framework import viewsets
#from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.


class WalkingEventViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = WalkingEvent.objects.all()
        serializer = WalkingEventSerializer(queryset, many=True)
        return Response(serializer.data)
