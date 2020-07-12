from . import urlstemplates, generateRandomVar
import json

def makeurls(Routes):
    Urls_file = urlstemplates.scafolding
    
    AllUrls = {}
    Paths = ""
    
    for Route in Routes:
        for pages in Route:
            Url = pages["Url"]
            if AllUrls.get(Url) != None:
                pages["FunctionName"] = AllUrls[Url]
                continue
            pages["FunctionName"] = getFuncname(Url)
            AllUrls[Url] = pages["FunctionName"]
            path = urlstemplates.path
            path = path.format(Url = Url , FunctionName = pages["FunctionName"])
            Paths += path
    UrlPatterns = urlstemplates.urlpatterns
    UrlPatterns = UrlPatterns.format(paths = Paths)
    Urls_file = Urls_file.format(urlpatterns = UrlPatterns)
    
    return [Routes , Urls_file]



def getFuncname(Url):
    url = Url
    name = url.replace("/", "_")
    name = name.replace("\\", "_")
    name += generateRandomVar.genRandomstring(5)
    return name
    
