from django.db import models
from django.utils.translation import gettext_lazy as _


class Task(models.Model):
    class Status(models.TextChoices):
        NotStarted = 'NS', _('Not started')
        InProgress = 'IP', _('In-progress')
        Completed = 'CO', _('Completed')

    title = models.CharField(max_length=500)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.InProgress)
    isArchived = models.BooleanField(default=False)
    createAt = models.DateTimeField(auto_now_add=True)
    updateAt = models.DateTimeField(auto_now_add=True)
