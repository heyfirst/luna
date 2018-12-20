from django.contrib import admin
from .models import Topic, Level, TopicLevel


# Register your models here.
@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    pass


@admin.register(Level)
class LevelAdmin(admin.ModelAdmin):
    pass


@admin.register(TopicLevel)
class TopicLevelAdmin(admin.ModelAdmin):
    list_per_page = 50
    list_display = (
        'pk',
        'topic',
        'level',
    )
