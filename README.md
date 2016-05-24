# BPM MBaaS Service

This is a BPM mBaaS service for working with the REST API of JBoss BPM Suite V6.x (https://docs.jboss.org/jbpm/v6.3/userguide/ch17.html).

The following environment variables need to be defined to create a connection to your JBoss BPM Suite.
Alternatively you can leave them empty and define a connection in the your App.
But note! This mBaaS will always take the environment variables, if they are defined.
- BPM\_URI\_HOSTNAME = mybpmserver.example.com
- BPM\_URI\_PORT = 8080
- BPM\_AUTH\_USERNAME = username
- BPM\_AUTH\_PASSWORD = mypassword

By setting the following environment variables you define a process which you want to interact with.
- BPM\_PROCESS\_DEPLOYMENTID = e.g. test:stp:1.0 (see https://docs.jboss.org/jbpm/v6.3/userguide/ch17.html#remote.rest.deployment)
- BPM\_PROCESS\_PROCESSDEFID = e.g. stp.my-process

# Group BPM API

# Start process [/bpm/startProcess]

VERY IMPORTANT: The content type of the request must be set: "Content-Type: application/json"

## startProcess [POST]

Starts a new process instance from the given template identified by "process-id".

+ Request (application/json)
    + Body
            {
              "processInput01": "This is my value.",
              "processInput02": "This is another value..."
            }

+ Response 200 (application/json)
    + Body
            {
              "id":1,
              "state":2,
              "parentProcessInstanceId":0,
              "status":"SUCCESS",
              "url":"/business-central/rest/runtime/test:stp:1.0/process/stp.my-process/start",
              "index":null,
              "process-id":"stp.my-process",
              "event-types":[]
            }

# Get process instance [/bpm/getProcessInstance]

VERY IMPORTANT: The content type of the request must be set: "Content-Type: application/json"

## getProcessInstance [POST]

Gets basic information about a certain process instance

+ Request (application/json)
    + Body
            {
              "procInstId": "1"
            }

+ Response 200 (application/json)
    + Body
            {
              "status":"SUCCESS",
              "url":"/business-central/rest/runtime/test:stp:1.0/withvars/process/instance/2",
              "variables":
                {
                  "processInput01": "This is my value.",
                  "processInput02": "This is another value..."
                  "initiator":"username"
                },
              "processInstance":
                {
                  "id":2,
                  "state":1,
                  "parentProcessInstanceId":0,
                  "process-id":"stp.my-process",
                  "event-types":[]
                }
            }
# Load tasks [/bpm/loadTasks]

VERY IMPORTANT: The content type of the request must be set: "Content-Type: application/json"

## loadTasks [POST]

Gets all the task.
Username, password, IP and port are optional values.

+ Request (application/json)
    + Body
            {
              "params":{
                "username": "username",
                "password": "password",
                "ip": "Your BPM IP",
                "port": "Your BPM Port"
              }
            }

+ Response 200 (application/json)
    + Body
            {
              "status":null,
              "url":null,
              "index":null,
              "commandName":null,
              "taskSummaryList":[{
                "@class":"org.kie.services.client.serialization.jaxb.impl.task.JaxbTaskSummary",
                "id":15,
                "name":"handle_problem",
                "subject":"",
                "description":"",
                "status":"Ready",
                "priority":0,
                "skipable":true,
                "actualOwnerId":null,
                "createdById":null,
                "createdOn":1463068007279,
                "activationTime":1463068007279,
                "expirationTime":null,
                "processInstanceId":15,
                "processId":"IoT_Human_Task.low_voltage",
                "processSessionId":2,
                "deploymentId":"com.redhat.demo.iot.datacenter:HumanTask:1.0",
                "quickTaskSummary":false,
                "parentId":-1,
                "potentialOwners":null
                }],
              "pageNumber":null,
              "pageSize":null
            }
# Load task content [/bpm/loadTaskContent]

VERY IMPORTANT: The content type of the request must be set: "Content-Type: application/json"

## loadTaskContent [POST]

Gets the content of a specific task. TASKID is required!
Username, password, IP and port are optional values.

+ Request (application/json)
    + Body
            {
              "params":{
                "username": "username",
                "password": "password",
                "ip": "Your BPM IP",
                "port": "Your BPM Port",
                "taskId": "ID"
              }
            }

+ Response 200 (application/json)
    + Body
            {
              "id":41,
              "content":"rO0ABXoAAAG/CgYIBhADGABK4gEIABJIb3JnLmRyb29scy5jb3JlLm1hcnNoYWxsaW5nLmltcGwuU2VyaWFsaXphYmxlUGxhY2Vob2xkZXJSZXNvbHZlclN0cmF0ZWd5GpMBrO0ABXNyABNqYXZhLnV0aWwuQXJyYXlMaXN0eIHSHZnHYZ0DAAFJAARzaXpleHAAAAAKdwQAAAAKdAAEdGVzdHQABHRlc3R0AAR0ZXN0dAAEdGVzdHQABHRlc3R0AAR0ZXN0dAAEdHJ1ZXQADUhhbmRsZVByb2JsZW10AAR1c2VydAAOaGFuZGxlX3Byb2JsZW14Us8BChMKCXRpbWVzdGFtcBAAGgQAAAAAChYKDGVycm9yTWVzc2FnZRAAGgQAAAABChQKCmRldmljZVR5cGUQABoEAAAAAgoSCghkZXZpY2VJRBAAGgQAAAADChMKCWVycm9yQ29kZRAAGgQAAAAEChEKB3BheWxvYWQQABoEAAAABQoTCglTa2lwcGFibGUQABoEAAAABgoSCghUYXNrTmFtZRAAGgQAAAAHChEKB0dyb3VwSWQQABoEAAAACAoSCghOb2RlTmFtZRAAGgQAAAAJ",
              "contentMap":{
                "errorMessage":"test",
                "timestamp":"test",
                "deviceType":"test",
                "deviceID":"test",
                "errorCode":"test",
                "payload":"test",
                "Skippable":"true",
                "TaskName":"HandleProblem",
                "GroupId":"user",
                "NodeName":"handle_problem"
                }
              }
# Claim task [/bpm/claimTask]

VERY IMPORTANT: The content type of the request must be set: "Content-Type: application/json"

## claimTask [POST]

Claims a task. TASKID is required!
Username, password, IP and port are optional values.

+ Request (application/json)
    + Body
            {
              "params":{
                "username": "username",
                "password": "password",
                "ip": "Your BPM IP",
                "port": "Your BPM Port",
                "taskId": "ID"
              }
            }

+ Response 200 (application/json)
    + Body
            {
              "status":"SUCCESS",
              "url":"/business-central/rest/task/15/claim",
              "message":null
            }
# Complete task [/bpm/completeTask]

VERY IMPORTANT: The content type of the request must be set: "Content-Type: application/json"

## completeTask [POST]

Completes a task. TASKID is required!
Username, password, IP and port are optional values.

+ Request (application/json)
    + Body
            {
              "params":{
                "username": "username",
                "password": "password",
                "ip": "Your BPM IP",
                "port": "Your BPM Port",
                "taskId": "ID"
              }
            }

+ Response 200 (application/json)
    + Body
            {
              "status":"SUCCESS",
              "url":"/business-central/rest/task/15/complete",
              "message":null
            }
# Release task [/bpm/releaseTask]

VERY IMPORTANT: The content type of the request must be set: "Content-Type: application/json"

## releaseTask [POST]

Completes a task. TASKID is required!
Username, password, IP and port are optional values.

+ Request (application/json)
    + Body
            {
              "params":{
                "username": "username",
                "password": "password",
                "ip": "Your BPM IP",
                "port": "Your BPM Port",
                "taskId": "ID"
              }
            }

+ Response 200 (application/json)
    + Body
            {
              "status":"SUCCESS",
              "url":"/business-central/rest/task/15/release",
              "message":null
            }
# Start task [/bpm/startTask]

VERY IMPORTANT: The content type of the request must be set: "Content-Type: application/json"

## startTask [POST]

Starts a task. TASKID is required!
Username, password, IP and port are optional values.

+ Request (application/json)
    + Body
            {
              "params":{
                "username": "username",
                "password": "password",
                "ip": "Your BPM IP",
                "port": "Your BPM Port",
                "taskId": "ID"
              }
            }

+ Response 200 (application/json)
    + Body
            {
              "status":"SUCCESS",
              "url":"/business-central/rest/task/15/start",
              "message":null
            }
