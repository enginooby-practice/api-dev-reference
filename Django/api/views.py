from rest_framework.response import Response
from rest_framework.decorators import api_view
from task_manager.models import Task
from .serializers import TodoSerializer


@api_view(['GET'])
def getAll(request):
    todolist = Task.objects.all()
    serializer = TodoSerializer(todolist, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def create(request):
    serializer = TodoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)
