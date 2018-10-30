from django.db import models
from core.models import Timestamp


# Create your models here.
class Task(Timestamp):
    task_name = models.CharField(
        max_length=255,
        blank=True,
        default='',
    )

    task_desc = models.TextField(default='')
    input_desc = models.TextField(default='')
    output_desc = models.TextField(default='')
    constrain_desc = models.TextField(default='')
    examples = models.TextField(default='')

    default_code = models.TextField(default='')

    main_topic = models.ForeignKey(
        'topics.TopicLevel',
        on_delete=models.SET_NULL,
        null=True,
        related_name="main_topic+",
    )
    secondary_topics = models.ManyToManyField(
        'topics.TopicLevel',
        related_name="secondary_topics+",
        blank=True,
    )

    enable = models.BooleanField(default=True)

    order = models.PositiveIntegerField(blank=True, null=True)

    def __str__(self):
        return f'{self.task_name} ({self.main_topic})'

    class Meta:
        ordering = ['main_topic', 'order']


class Testcase(models.Model):
    task = models.ForeignKey(
        'tasks.Task',
        on_delete=models.CASCADE,
    )
    test = models.TextField(default='')
    expected_output = models.TextField(default='')
    is_hidden = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.task}: test: {self.test} | expected: {self.expected_output} | ({self.is_hidden})'
