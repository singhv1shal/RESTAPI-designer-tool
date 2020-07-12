from . import viewtemplates, generateRandomVar
Functions = {}

def makeviews(tables, routes):
    global Functions
    View_File = viewtemplates.scafolding
    
    for route in routes:
        for func in route:
            funcname = func["FunctionName"]
            Functions[funcname] = "@csrf_exempt\n"
            Functions[funcname] += "def %s (request):\n" % funcname
            
    
    makeaddroutes(routes[0], tables)
    makedeleteroutes(routes[1])
    makeupdateroutes(routes[2])
    makequeryroutes(routes[3])
        
    TablesNames = ""
    for table in tables:
        TablesNames += table["TableName"] + ", "
    TablesNames = TablesNames[0:len(TablesNames) - 2]
    
    AllFunctions = ""
    for func in Functions:
        if (Functions[func].find("POST") >= 0) and (Functions[func].find("GET") >= -1):
            Functions[func] += viewtemplates.method.format(method = "GET")
            Functions[func] += "\t\treturn HttpResponse('Bad Request')\n"
            
        elif (Functions[func].find("POST") >= -1) and (Functions[func].find("GET") >= 0):
            Functions[func] += viewtemplates.method.format(method = "POST")
            Functions[func] += "\t\treturn HttpResponse('Bad Request')\n"
        
        AllFunctions += Functions[func]+'\n'
        
    
    View_File = View_File.format(TablesNames = TablesNames , Functions = AllFunctions)
    return View_File

def makeaddroutes(routes, tables):
    global Functions
    for route in routes:
        url = route["Url"]
        funcname = route["FunctionName"]
        method = route["method"]
        sel_tables = route["models_req"]
        
        Function = viewtemplates.method.format(method = method)
        
        for table in tables:
            Cols = ""
            if table["TableName"] in sel_tables:
                for field in table["Fields"]:
                    Function += viewtemplates.GetVars(col = field["FieldName"], method = method)
                    Cols +=  field["FieldName"] + " = " + field["FieldName"] + " , "
                
                Cols = Cols[0:len(Cols)-3]
                Function += viewtemplates.AddData.format( TableName = table["TableName"] , Coloumns = Cols ,
                                                         VarName = "var"+generateRandomVar.genRandomstring(5))
        
        Functions[funcname] += Function + "\n\t\treturn HttpResponse('OK')\n"
        
        
        
def makedeleteroutes(routes):
    global Functions
    for route in routes:
        url = route["Url"]
        funcname = route["FunctionName"]
        method = route["method"]
        given = route["given"]
        delete = route["delete"]
        D = {}
        
        Function = viewtemplates.method.format(method = method)
        
        for table in delete:
            D[table] = []
        for G in given:
            D[G["model"]].append(G["field"])
            
        for tablename in delete:
            Cols = ""
            for field in D[tablename]:
                Function += viewtemplates.GetVars(col = field, method = method)
                Cols +=  field + " = " + field + " , "
            
            Cols = Cols[0:len(Cols)-3]
            Function += viewtemplates.DeleteData.format( TableName = tablename , Coloumns = Cols)
            
        Functions[funcname] += Function + "\n\t\treturn HttpResponse('OK')\n"
        
        
        
def makeupdateroutes(routes):
    global Functions
    for route in routes:
        url = route["Url"]
        funcname = route["FunctionName"]
        method = route["method"]
        given = route["given"]
        update = route["set"]
        U = {}
        
        Function = viewtemplates.method.format(method = method)
        
        for G in given:
            if U.get(G["model"]) == None:
                U[G["model"]] = { "Given": [] , "Update": []}
            U[G["model"]]["Given"].append(G["field"])
            
        for G in update:
            if U.get(G["model"]) == None:
                U[G["model"]] = { "Given": [] , "Update": []}
            U[G["model"]]["Update"].append(G["field"])
            
        for tablename in U:
            Cols = ""
            for field in U[tablename]["Given"]:
                Function += viewtemplates.GetVars(col = field, method = method)
                Cols +=  field + " = " + field + " , "
            Cols = Cols[0:len(Cols)-3]
            
            Sets = ""
            for field in U[tablename]["Update"]:
                Function += viewtemplates.GetVars(col = field, method = method)
                Sets +=  field + " = " + field + " , "
            Sets = Sets[0:len(Sets)-3]
            Function += viewtemplates.UpdateData.format( TableName = tablename , Given_Coloumns = Cols, Update_Coloumns = Sets)
        
        Functions[funcname] += Function + "\n\t\treturn HttpResponse('OK')\n"

        
def makequeryroutes(routes):
    global Functions
    for route in routes:
        url = route["Url"]
        funcname = route["FunctionName"]
        method = route["method"]
        given = route["given"]
        query = route["query"]
        Q = {}
        MainVar = "Main"+generateRandomVar.genRandomstring(5)
        
        Function = viewtemplates.method.format(method = method)
        
        Function += "\t\t"+MainVar+" = { }\n"
        
        for table in query:
            Q[table["model"]] = { "Filter" : [] , "Query" : [] }
        for G in given:
            Q[G["model"]]["Filter"].append(G["field"])
        for G in query:
            Q[G["model"]]["Query"].append(G["field"])
            
        for tablename in Q:
            varName = "var"+generateRandomVar.genRandomstring(5)
            filters = ""
            for field in Q[tablename]["Filter"]:
                Function += viewtemplates.GetVars(col = field, method = method)
                filters +=  field + " = " + field + " , "
            filters = filters[0:len(filters)-3]
            
            getters = ""
            for field in Q[tablename]["Query"]:
                getters += viewtemplates.getsingle.format(MainVar = MainVar , TableName = tablename, get = field)
            
            Function += viewtemplates.QueryData.format( TableName = tablename ,
                                                         filters = filters,
                                                         MainVar = MainVar,
                                                         VarName = varName)
            Function += "{ })\n"
            Function += getters
        Functions[funcname] += Function + "\n\t\treturn HttpResponse(json.dumps({MainVar}))\n".format(MainVar = MainVar)
        