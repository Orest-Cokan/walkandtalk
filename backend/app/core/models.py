import uuid
import os
import datetime
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin


def image_file_path(instance, filename):
    """Generate file path for new recipe image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('uploads/', filename)


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(email=self.normalize_email(email),
                          **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password, **extra_fields):
        user = self.create_user(email, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    fullname = models.CharField(max_length=60, blank=True)
    profile_pic = models.ImageField(
        upload_to=image_file_path,
        default='avatar.png')
    date_of_birth = models.DateField(("Date"), default=datetime.date.today)
    menopause_stage = models.CharField(max_length=30, default="test")
    length_of_walk_distance = models.IntegerField(default=10)
    length_of_walk_duration = models.IntegerField(default=10)
    intensity = models.CharField(max_length=10, default="test")
    indoor = models.BooleanField(default=True)
    location = models.CharField(max_length=30, default="test")
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['fullname',
                       'date_of_birth',
                       'menopause_stage',
                       'length_of_walk_distance',
                       'length_of_walk_duration',
                       'intensity',
                       'indoor',
                       'location'
                       ]

    def __str__(self):
        return self.email


class Post(models.Model):
    id = models.UUIDField(primary_key=True,
                          default=uuid.uuid4,
                          editable=False)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_posts'
    )
    photo = models.ImageField(
        upload_to=image_file_path,
        blank=False,
        editable=False)
    text = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    posted_on = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL,
                                   related_name="likers",
                                   blank=True,
                                   symmetrical=False)

    class Meta:
        ordering = ['-posted_on']

    def number_of_likes(self):
        if self.likes.count():
            return self.likes.count()
        else:
            return 0

    def __str__(self):
        return f'{self.author}\'s post'


class Comment(models.Model):
    post = models.ForeignKey('Post',
                             on_delete=models.CASCADE,
                             related_name='post_comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL,
                               on_delete=models.CASCADE,
                               related_name='user_comments')
    text = models.CharField(max_length=100)
    posted_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-posted_on']

    def __str__(self):
        return f'{self.author}\'s comment'


class WalkingEvent(models.Model):
    title = models.CharField(max_length=30)
    date = models.DateField()
    description = models.CharField(max_length=300)
    is_indoor = models.BooleanField()
    walking_intensity = models.TextField()
    weather = models.TextField()
    attending_status = models.TextField()

    def __str__(self):
        return f'{self.title}'
