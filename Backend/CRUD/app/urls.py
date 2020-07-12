from django.urls import path
from . import views

urlpatterns = [
    path('',views.index,name="Index"),
    path('save',views.Save_user,name="Save"),
    path('getallusers',views.getallusers,name="GETALL"),
    path('getproject',views.Getproject,name="GETProject"),
    path('getuser',views.Getuser,name="GETuser"),
]
