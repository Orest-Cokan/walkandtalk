from django.urls import path, include
from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('api/walkingevent', views.WalkingEventView)


urlpatterns = [
    path('', include(router.urls))
]
