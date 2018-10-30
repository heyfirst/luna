from django.contrib import admin
from django.utils.translation import gettext_lazy as _
# Register your models here.
from .models import Task, Testcase


class OrderFilter(admin.SimpleListFilter):

    title = _('Has Order')

    parameter_name = 'has_order'

    def lookups(self, request, model_admin):

        return (
            ('yes', _('Yes')),
            ('no', _('No')),
        )

    def queryset(self, request, queryset):

        if self.value() == 'yes':
            return queryset.filter(order__isnull=False)

        if self.value() == 'no':
            return queryset.filter(order__isnull=True)


# Register your models here.
@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = (
        'main_topic',
        'order',
        'task_name',
    )

    list_filter = (
        OrderFilter,
        'main_topic',
    )


@admin.register(Testcase)
class TestcaseAdmin(admin.ModelAdmin):
    list_display = (
        'task',
        'test',
        'expected_output',
        'is_hidden',
    )
