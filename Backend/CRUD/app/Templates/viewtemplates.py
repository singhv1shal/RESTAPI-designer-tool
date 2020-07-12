scafolding = '''
from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .models import {TablesNames}
import json

{Functions}

'''

AddData = '''\t\t{VarName} = {TableName}({Coloumns})
\t\t{VarName}.save()
'''

DeleteData = '''\t\t{TableName}.objects.filter({Coloumns}).delete()
'''

UpdateData = '''\t\t{TableName}.objects.filter({Given_Coloumns}).update({Update_Coloumns})
'''

QueryData = '''\t\t{VarName} = {TableName}.objects.filter({filters})
\t\t{MainVar}["{TableName}"] = []
\t\tfor obj in {VarName}:
\t\t\t{MainVar}["{TableName}"].append('''


getsingle = '''\t\t\t{MainVar}["{TableName}"][ len({MainVar}["{TableName}"]) - 1 ]["{get}"] = obj.{get}
'''

method = '''\tif request.method == "{method}":
'''

def GetVars(col , method):
    if method == "GET":
        return '\t\t'+col+' = request.GET["'+col+'"]\n'
    else:
        return '\t\t'+col+' = request.POST["'+col+'"]\n'
