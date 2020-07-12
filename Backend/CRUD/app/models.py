from django.db import models

class Users(models.Model):
    username = models.CharField(primary_key = True, max_length=50, default = "")
    password = models.CharField(max_length=50)
    
    # def __str__(self):
    #     return "%s %s" % (self.username, self.email)
    
class Boxes(models.Model):
    projectname = models.CharField( max_length=50, null = False)
    views = models.TextField(null = False)
    urls = models.TextField(null = False)
    tables = models.TextField(null = False)
    
    datetime = models.DateTimeField(auto_now=False, auto_now_add=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE)
    
    class Meta:
        ordering = ['datetime']
