from django.urls import path
from . import views

urlpatterns = [
    path('', views.getAll),
    path('add/', views.create)
]
