from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(['GET'])
def getTodoList(request):
    todoList = [{'title': 'Todo1', 'status': 'In-progress'},
                {'title': 'Todo2', 'status': 'Completed'}]
    return Response(todoList)
