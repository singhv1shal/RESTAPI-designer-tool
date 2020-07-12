
scafolding = '''
from django.db import models
{classes}
'''

modelclass = '''
class {ModelName}(models.Model):
{Columns}


'''

entry = "\t{FieldName} = models.{DataType}({options})\n"
foreignkey = "\t{ColName} = models.ForeignKey({OtherTable}, on_delete=models.CASCADE)\n"

