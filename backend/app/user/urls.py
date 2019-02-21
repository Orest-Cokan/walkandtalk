from django.urls import path

from rest_framework_jwt.views import obtain_jwt_token


from user import views

app_name = 'user'

urlpatterns = [
    path('register/', views.RegisterUserView.as_view(),
         name='register'),
    path('login/', obtain_jwt_token,
         name='login'),
    path('me/', views.ManageUserView.as_view(),
         name='me'),
    path('<slug:fullname>/', views.UserProfileView.as_view(),
         name='user-profile')
]
