from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from .models import WalkingEvent
from datetime import time
from rest_framework.reverse import reverse as api_reverse
User = get_user_model()
import requests


class WalkingEventAPITestCase(APITestCase):

    def setUp(self):
        user_obj = User(username="testuser", email="testemail@gmail.com")
        user_obj.set_password("randompassword")
        user_obj.save()
        walking_event = WalkingEvent.objects.create(
            user=user_obj,
            title="walking event",
            description="Test random description",
            date='2020-01-01',
            start_time='01:01:01',
            end_time="12:12:12",
            intensity="slow",
            is_indoor=True,
        )

    def test_single_user(self):
        user_count = User.objects.count()
        self.assertEqual(user_count, 1)

    def test_single_post(self):
        event_count = WalkingEvent.objects.count()
        self.assertEqual(event_count, 1)

    def test_get_list(self):
        data = {}
        url = "http://127.0.0.1:8000/api/walkingevent/"
        response = self.client.get(url, data, format='json')
        print(data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_walkingevent(self):
        user_obj = User(username="test111user", email="test111email@gmail.com")
        user_obj.set_password("randompas111sword")
        user_obj.save()
        walking_event = {
            "pk": "56",
            "user": "ivan",
            "title": "walking event",
            "date": "2020-03-20",
            "start_time": "morning",
            "end_time": "morning",
            "description": "after this",
            "intensity": "slow",
            "is_indoor": False
        }
        url = "http://127.0.0.1:8000/api/walkingevent/"
        response = requests.post(url, data=walking_event)
        print(response.status_code)
