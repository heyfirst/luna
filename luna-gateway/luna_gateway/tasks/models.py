from django.db import models
from core.models import Timestamp


# Create your models here.
class Task(Timestamp):
    task_name = models.CharField(
        max_length=255,
        blank=True,
        default='',
    )

    description = models.TextField(default='')
    topics = models.ManyToManyField('topics.TopicLevel')

    def __str__(self):
        return f'{self.task_name}'


class Testcase(models.Model):
    task = models.ForeignKey(
        'tasks.Task',
        on_delete=models.CASCADE,
    )
    input = models.TextField(default='')
    expected_output = models.TextField(default='')
    is_hidden = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.task}: input: {self.input} | expected: {self.expected_output} | ({self.is_hidden})'
