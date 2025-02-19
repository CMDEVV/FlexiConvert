from django.urls import path 
from . import views

urlpatterns = [
    path("get-csrf-token/", views.get_csrf_token, name="get_csrf_token"),
    path("convert-file/", views.convert_image, name="convert-file")
]