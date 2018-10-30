from django.db import models
from django.conf import settings
from datetime import timedelta

from core.models import Timestamp


# Create your models here.
class Answer(Timestamp):
    task = models.ForeignKey('tasks.Task', on_delete=models.CASCADE)
    source_code = models.TextField(default='')
    duration = models.DurationField(default=timedelta(seconds=0))

    result = models.BooleanField(default=False)

    owned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )


class SolutionVote(Timestamp):
    answer = models.ForeignKey('answers.Answer', on_delete=models.CASCADE)

    VOTE_TYPES = (
        ('best_practice', 'ยอดเยี่ยม'),
        ('clever', 'ฉลาดใช้'),
    )

    vote_type = models.CharField(
        null=False,
        blank=False,
        choices=VOTE_TYPES,
        default='',
        max_length=20,
    )

    owned_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
