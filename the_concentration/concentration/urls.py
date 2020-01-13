from django.urls import path
from . import views

app_name = 'concentration'

urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('<int:card_num>/', views.Home.as_view(), name='home'),
]