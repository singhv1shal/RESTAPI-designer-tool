urlpatterns = '''
urlpatterns = [
{paths}
]
'''

path = "\tpath('{Url}' , views.{FunctionName} , name=\"{FunctionName}\"),\n"

scafolding = '''
from django.urls import path
from . import views

{urlpatterns}
'''