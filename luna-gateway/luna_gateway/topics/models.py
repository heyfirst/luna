from django.db import models


def _get_image_topic(instance, filename):
    fn = 'topics/%s.jpg' % instance.topic_name
    return fn


class Topic(models.Model):
    topic_name = models.CharField(
        max_length=30,
        blank=True,
        default='',
    )

    logo = models.ImageField(null=True, blank=True, upload_to=_get_image_topic)
    description = models.TextField(default='')

    def __str__(self):
        return f'{self.topic_name}'


class Level(models.Model):
    level_name = models.CharField(
        max_length=30,
        blank=True,
        default='',
    )
    score = models.PositiveIntegerField(default=0)

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

    class Meta:
        ordering = (
            'topic',
            'level',
        )

    def __str__(self):
        return f'{self.topic}: {self.level}'
