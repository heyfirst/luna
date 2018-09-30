from django.db import models
from django.conf import settings
from datetime import timedelta

from core.models import Timestamp


# Create your models here.
class Answer(Timestamp):
    task = models.ForeignKey('tasks.Task', on_delete=models.CASCADE)
    source_code = models.TextField(default='')
    duration = models.DurationField(default=timedelta(seconds=0))
    owned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
