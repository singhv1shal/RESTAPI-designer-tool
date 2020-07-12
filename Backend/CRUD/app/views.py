from django.shortcuts import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from .Templates.For_urls import makeurls
from .Templates.For_models import makemodels
from .Templates.For_views import makeviews
import hashlib, json

from .models import Users, Boxes


@csrf_exempt
def index(request):
    if request.method == "POST":
        Data = request.body # from postman
        Data = json.loads(Data)
        if Data.get("username") == None or Data.get("password") == None or Data.get("ProjectName") == None or Data.get("AddDataRoutes") == None or Data.get("DeleteDataRoutes") == None or Data.get("UpdateDataRoutes") == None or Data.get("QueryDataRoutes") == None or Data.get("Models") == None :
            return HttpResponse("<h1>Bad Request</h1>")
        
        username = Data["username"]
        password = Data["password"]
        password = hashlib.sha1(password.encode()).hexdigest()
        
        user = Users.objects.filter(username = username, password = password)
        if len(user) == 0:
            return HttpResponse("User does not exist")
        
        ProjectName = Data["ProjectName"]
        Tables = Data["Models"]
        Routes = [
            Data["AddDataRoutes"], # "AddRoutes" 
            Data["DeleteDataRoutes"], #"DeleteRoutes"
            Data["UpdateDataRoutes"], #"UpdateRoutes"
            Data["QueryDataRoutes"] #"QueryRoutes"
        ]
        
        From_Urls = makeurls(Routes)
        Routes = From_Urls[0]
        Urls_py = From_Urls[1]
        Models_py = makemodels(Tables) 
        Views_py = makeviews(Tables , Routes) 
        
        Boxes.objects.filter(projectname = ProjectName ,
                              user = Users.objects.get(username = username)).delete()
        
        Box = Boxes(projectname = ProjectName , views = Views_py, urls = Urls_py , tables = Models_py ,
                     user = Users.objects.get(username = username))
        Box.save()
        
        Main_gizkl = { }
        var_xiini =  Boxes.objects.filter( projectname = ProjectName ,  user = Users.objects.get(username = username) ).values()
        var_xiini = var_xiini[len(var_xiini) -1]
        Main_gizkl = {}
        
        Main_gizkl["id"] = var_xiini["id"]
        Main_gizkl["urls"] = var_xiini["urls"]
        Main_gizkl["tables"] = var_xiini["tables"]
        Main_gizkl["views"] = var_xiini["views"]
        
        return HttpResponse(json.dumps(Main_gizkl))
    
    else:
        return HttpResponse("<h1>Bad Request</h1>")
    
@csrf_exempt    
def Save_user(request):
    if request.method == "POST":
        Data = json.loads(request.body)
        if Data.get("username") == None or Data.get("password") == None :
            return HttpResponse("<h1>Bad Request</h1>")
        username = Data["username"]
        password = Data["password"]
        password = hashlib.sha1(password.encode()).hexdigest()
        user = Users(username = username , password = password )
        user.save()
        return HttpResponse("User added!")
    else:
        return HttpResponse("<h1>Bad Request</h1>")

def getallusers(request):
    user = Users.objects.filter().values()
    user = json.dumps(list(user))
    return HttpResponse(user)


@csrf_exempt
def Getuser(request):
    if request.method == "POST":
        Data = json.loads(request.body)
        if Data.get("username") == None or Data.get("password") == None :
            return HttpResponse("<h1>Bad Request</h1>")
        username = Data["username"]
        password = Data["password"]
        password = hashlib.sha1(password.encode()).hexdigest()
        
        user = Users.objects.filter(username = username, password = password)
        if len(user) == 0:
            return HttpResponse("User does not exist")
        
        return HttpResponse("OK")
        
    else:
        return HttpResponse("<h1>Bad Request</h1>")


@csrf_exempt
def Getproject(request):
    if request.method == "POST":
        Data = json.loads(request.body)
        if Data.get("username") == None or Data.get("password") == None or Data.get("projectName") == None:
            return HttpResponse("<h1>Bad Request</h1>")
        
        projectName = Data["projectName"]
        username = Data["username"]
        password = Data["password"]

        password = hashlib.sha1(password.encode()).hexdigest()
        user = Users.objects.filter(username = username, password = password)
        if len(user) == 0:
            return HttpResponse("User does not exist")
        
        Main_gizkl = { }
        var_xiini =  Boxes.objects.filter(  user = Users.objects.get(username = username) ).values()
        
        var_xiini = var_xiini[len(var_xiini) -1]
        Main_gizkl["Boxes"] = []
        Main_gizkl["Boxes"].append({})
        for obj in var_xiini:
            Main_gizkl["Boxes"][ 0 ]["urls"] = var_xiini["urls"]
            Main_gizkl["Boxes"][ 0 ]["tables"] = var_xiini["tables"]
            Main_gizkl["Boxes"][ 0 ]["views"] = var_xiini["views"]
            
        return HttpResponse(json.dumps(Main_gizkl))
    else:
        return HttpResponse("<h1>Bad request</h1>")