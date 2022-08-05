from rest_framework.response import Response
from rest_framework.decorators import api_view
from todolist.models import Todo
from .serializers import TodoSerializer


@api_view(['GET'])
def getTodoList(request):
    # todoList = [{'title': 'Todo1', 'status': 'In-progress'},
    #             {'title': 'Todo2', 'status': 'Completed'}]
    
    todolist = Todo.objects.all()
    serializer = TodoSerializer(todolist, many=True)
    return Response(serializer.data)
