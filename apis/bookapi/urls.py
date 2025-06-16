from django.urls import path, include
from django.http import HttpResponse
from . import views

urlpatterns = [
    path('',views.Home,name='home'),
    path('deletebook/<int:pk>/',views.deletebook,name='delete')
]