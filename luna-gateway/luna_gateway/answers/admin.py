from django.contrib import admin

# Register your models here.
from .models import Answer


# Register your models here.
@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    pass
