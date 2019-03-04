from django.urls import path, include
from rest_framework import routers
from . import views


app_name = 'walkandtalk'
urlpatterns = [
    path('', views.WalkingEventListView.as_view(), name='list'),
    path('<int:pk/', views.Walk)
]
