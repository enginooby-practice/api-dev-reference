from django.urls import path
from . import views

urlpatterns = [
    path('', views.getTodoList),
    path('add/', views.addTodo)
]
