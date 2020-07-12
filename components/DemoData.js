Data = {
    "username": "Demo",
    "password": "2345", 
    "AddDataRoutes": [{
        "id": 0,
        "Url": "Store/emp",
        "method": "POST",
        "models_req": ["Employee"]
    }, {
        "id": 1,
        "Url": "Store/task",
        "method": "POST",
        "models_req": ["Tasks"]
    }],
    "DeleteDataRoutes": [{
        "id": 0,
        "Url": "Delete/emp",
        "method": "GET",
        "given": [{
            "model": "Employee",
            "field": "Empid"
        }],
        "delete": ["Employee"]
    }, {
        "id": 1,
        "Url": "Delete/tasks",
        "method": "POST",
        "given": [{
            "model": "Tasks",
            "field": "Taskid"
        }],
        "delete": ["Tasks"]
    }, {
        "id": 2,
        "Url": "Delete/all",
        "method": "GET",
        "given": [],
        "delete": ["Employee", "Tasks"]
    }],
    "QueryDataRoutes": [{
        "id": 0,
        "Url": "Get/emp",
        "method": "GET",
        "given": [{
            "model": "Employee",
            "field": "Empid"
        }],
        "query": [{
            "model": "Employee",
            "field": "Empid"
        }, {
            "model": "Employee",
            "field": "Empname"
        }, {
            "model": "Employee",
            "field": "Salary"
        }]
    }, {
        "id": 1,
        "Url": "Get/tasks",
        "method": "GET",
        "given": [{
            "model": "Tasks",
            "field": "Taskid"
        }],
        "query": [{
            "model": "Tasks",
            "field": "Taskid"
        }, {
            "model": "Tasks",
            "field": "Assigned"
        }]
    }, {
        "id": 2,
        "Url": "Get/all",
        "method": "POST",
        "given": [],
        "query": [{
            "model": "Employee",
            "field": "Empid"
        }, {
            "model": "Employee",
            "field": "Empname"
        }, {
            "model": "Employee",
            "field": "Salary"
        }, {
            "model": "Tasks",
            "field": "Taskid"
        }, {
            "model": "Tasks",
            "field": "Assigned"
        }]
    }],
    "UpdateDataRoutes": [{
        "id": 0,
        "Url": "Update/emp",
        "method": "POST",
        "given": [{
            "model": "Employee",
            "field": "Empid"
        }],
        "set": [{
            "model": "Employee",
            "field": "Empname"
        }, {
            "model": "Employee",
            "field": "Salary"
        }]
    }, {
        "id": 1,
        "Url": "Update/tasks",
        "method": "POST",
        "given": [{
            "model": "Tasks",
            "field": "Taskid"
        }],
        "set": [{
            "model": "Tasks",
            "field": "Assigned"
        }]
    }, {
        "id": 2,
        "Url": "Update/all",
        "method": "POST",
        "given": [],
        "set": [{
            "model": "Employee",
            "field": "Salary"
        }, {
            "model": "Tasks",
            "field": "Assigned"
        }]
    }],
    "ProjectName": "DemoProject",
    "Databaseinfo": {
        "Db": "DemoDb",
        "User": "root",
        "Host": "localhost",
        "Password": "12345",
        "Num_tables": "2"
    },
    "Models": [{
        "id": 0,
        "TableName": "Employee",
        "Fields": [{
            "Constraints": ["Primary Key"],
            "id": "0",
            "FieldName": "Empid",
            "Datatype": "Integer",
            "default": "None"
        }, {
            "Constraints": ["Not Null"],
            "id": "1",
            "FieldName": "Empname",
            "Datatype": "Text",
            "default": "None"
        }, {
            "Constraints": [],
            "id": "2",
            "FieldName": "Salary",
            "Datatype": "Decimal",
            "default": "0.0"
        }]
    }, {
        "id": 1,
        "TableName": "Tasks",
        "Fields": [{
            "Constraints": ["Primary Key"],
            "id": "0",
            "FieldName": "Taskid",
            "Datatype": "Integer",
            "default": "None"
        }, {
            "Constraints": [],
            "id": "1",
            "FieldName": "Assigned",
            "Datatype": "Text",
            "default": "None"
        }]
    }]
}