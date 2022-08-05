from enum import Enum
from django.db import models
from django.utils.translation import gettext_lazy as _


class Todo(models.Model):
    class Status(models.TextChoices):
        NotStarted = 'NS', _('Not started')
        InProgress = 'IP', _('In-progress')
        Completed = 'CO', _('Completed')

    title = models.CharField(max_length=500)
    content = models.CharField(max_length=1000)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.InProgress)
    time_created = models.DateTimeField(auto_now_add=True)
    is_archived = models.BooleanField(default=False)
