from django.contrib import admin

# Register your models here.
from .models import Task, Testcase


# Register your models here.
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    pass


@admin.register(Testcase)
class TestcaseAdmin(admin.ModelAdmin):
    list_display = (
        'task',
        'input',
        'expected_output',
        'is_hidden',
    )
