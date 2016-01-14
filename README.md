# BPM MBaaS Service

This is a BPM mBaaS service for working with the REST API of JBoss BPM Suite V6.x (https://docs.jboss.org/jbpm/v6.3/userguide/ch17.html).

The following environment variables need to be defined:
'BPM_URI_HOSTNAME' = mybpmserver.example.com
- BPM_URI_PORT = 8080
- BPM_AUTH_USERNAME = username
- BPM_AUTH_PASSWORD = mypassword
- BPM_PROCESS_DEPLOYMENTID = e.g. test:stp:1.0 (see https://docs.jboss.org/jbpm/v6.3/userguide/ch17.html#remote.rest.deployment)
- BPM_PROCESS_PROCESSDEFID = e.g. stp.my-process

# Group BPM API

# bpm [/bpm]

VERY IMPORTANT: The content type of the request must be set: "Content-Type: application/json"

## /bpm/startProcess [POST]

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

## /bpm/getProcessInstance [POST]

Gets basic information about a certain process instance

+ Request (application/json)
    + Body
            {
              "procInstId": "1",
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
