# from django.shortcuts import render
from rest_framework import viewsets, views
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from answers.models import Answer
from answers.serializers import AnswerSerializer
from .models import Task, Testcase
from .serializers import TaskReadSerializer, TaskWriteSerializer, TestcaseSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return TaskReadSerializer
        if self.action in ['create', 'update', 'partial_update']:
            return TaskWriteSerializer
        return TaskReadSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        topic = request.GET.get('topic')
        level = request.GET.get('level')
        has_order = request.GET.get('has_order')

        if (topic != 'All'):
            queryset = queryset.filter(main_topic__topic_id=topic)

        if (level != 'All'):
            queryset = queryset.filter(main_topic__level_id=level)

        if (has_order == 'True'):
            queryset = queryset.filter(order__isnull=False)
        elif (has_order == 'False'):
            queryset = queryset.filter(order__isnull=True)
        else:
            pass

        tasks = self.get_serializer(queryset, many=True).data
        return Response(tasks)

    def retrieve(self, request, *args, **kwargs):
        task = self.get_object()
        user = request.user

        if (
            user.is_superuser or user.is_staff or
            self._is_admin(user) == 'admin'
        ):
            return self._get_task_or_task_with_answer(task, user)

        elif (task.order == 1):
            return self._get_task_or_task_with_answer(task, user)

        elif (task.order is None):
            return self._get_task_or_task_with_answer(task, user)

        else:
            before_task = Task.objects.get(
                main_topic=task.main_topic,
                order=task.order - 1,
            )
            try:
                Answer.objects.get(
                    owned_by=user,
                    task=before_task,
                )
                return self._get_task_or_task_with_answer(task, user)
            except Answer.DoesNotExist:
                return Response(
                    {
                        "messages": "You should to solve the before task"
                    },
                    status=status.HTTP_403_FORBIDDEN
                )

    @action(detail=True)
    def testcases(self, request, pk=None):
        testcases = Testcase.objects.filter(task__pk=pk, is_hidden=False)
        serializer = TestcaseSerializer(
            testcases,
            many=True,
            context={'request': request},
        )
        return Response(serializer.data)

    def _is_admin(self, user):
        try:
            groups = user.groups.all()
            if (groups[0]):
                return groups[0].name
            else:
                return ''
        except Exception:
            return ''

    def _get_task_or_task_with_answer(self, task, user):
        task_json = self.get_serializer(task).data
        try:
            answer_data = Answer.objects.get(
                owned_by=user,
                task=task,
            )
            answer = AnswerSerializer(answer_data).data
            return Response({
                **task_json,
                "answer": answer,
            })
        except Answer.DoesNotExist:
            return Response({
                **task_json,
            })


class TescaseViewSet(viewsets.ModelViewSet):
    queryset = Testcase.objects.all()
    serializer_class = TestcaseSerializer
    filter_fields = ('__all__')
    ordering_fields = '__all__'
    ordering = ('pk', )


class TaskCompletedView(views.APIView):
    def get(self, request):
        username = request.GET.get('username')
        queryset = get_user_model()
        filter_kwargs = {
            'username': username,
        }
        obj = get_object_or_404(queryset, **filter_kwargs)
        user = obj
        answer_pks = Answer.objects.filter(owned_by=user).values_list(
            'task', flat=True
        )

        tasks = Task.objects.filter(pk__in=answer_pks)
        data = TaskReadSerializer(tasks, many=True).data

        return Response(data)


class TaskLastOfOrderView(views.APIView):
    def get(self, request):
        main_topic = request.GET.get('main_topic')

        task = Task.objects.filter(
            main_topic_id=main_topic,
            order__isnull=False,
        ).order_by('-order')

        data = TaskReadSerializer(task[0]).data
        return Response(data)
