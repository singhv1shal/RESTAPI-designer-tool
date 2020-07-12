from . import modeltemplates
import random , json

def makemodels(Tables):
    Models_file = modeltemplates.scafolding
    Classes = ""
    
    for Table in Tables:
        Fields = Table["Fields"]
        Model_class = modeltemplates.modelclass
        Columns = ""
        for Field in Fields:
            Line = modeltemplates.entry
            Datatype = Field["Datatype"]
            Options = getOptions(Field["Constraints"], Datatype, Field["default"])
            Line = Line.format( FieldName = Field["FieldName"] , DataType = Datatype , options = Options)
            Columns += Line
        
        Model_class = Model_class.format(ModelName = Table["TableName"] , Columns = Columns)
        Classes += Model_class
        
    Models_file = Models_file.format(classes = Classes)
    return Models_file


def getOptions(constraints, datatype, default):
    Options = ""
    
    if default != "": 
        Options  = "default = " + default +" , "
        
    if datatype == "DateTimeField":
        if default == "now":
            Options  = "default = auto_now_add , " 
    
    for op in constraints:
        Options += op + " = True , "
        
    Options = Options[0:len(Options)-3]
    return Options