from django.db import models


class Topic(models.Model):
    topic_name = models.CharField(
        max_length=30,
        blank=True,
        default='',
    )

    def __str__(self):
        return f'{self.topic_name}'


class Level(models.Model):
    level_name = models.CharField(
        max_length=30,
        blank=True,
        default='',
    )

    def __str__(self):
        return f'{self.level_name}'


class TopicLevel(models.Model):
    topic = models.ForeignKey(
        'topics.Topic',
        on_delete=models.CASCADE,
    )

    level = models.ForeignKey(
        'topics.Level',
        on_delete=models.CASCADE,
    )

    outcome = models.TextField(blank=True)

    expected_tasks = models.IntegerField(default=0)

    class Meta:
        ordering = (
            'topic',
            'level',
        )

    def __str__(self):
        return f'{self.topic}: {self.level} (expected: {self.expected_tasks})'
