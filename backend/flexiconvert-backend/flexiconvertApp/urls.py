from django.urls import path 
from . import views

urlpatterns = [
    path("convert-file/", views.convert_image, name="convert-file")
]