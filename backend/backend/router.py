from walkandtalk.api.viewsets import WalkingEventViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register('walkingevents', WalkingEventViewSet,
                base_name='walkingevent')
