var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var http = require('http')

function bpmRoute () {
  var bpm = new express.Router()
  bpm.use(cors())
  bpm.use(bodyParser.json())

  // GET REST endpoint - query params may or may not be populated
  bpm.post('/startProcess', function (req, res) {
    // Prepare BPM REST call
    var options = {
      hostname: req.body.params.ip,
      port: req.body.params.port,
      path: '/business-central/rest/runtime/' + process.env.BPM_PROCESS_DEPLOYMENTID + '/process/' + process.env.BPM_PROCESS_PROCESSDEFID + '/start?' + createQueryParameterMapString(req.body.params),
      method: 'POST',
      auth: req.body.params.username + ':' + req.body.params.password,
      headers: {
        'Accept': 'application/json'
      }
    }
    // Execute BPM REST call
    var bpmHttpReq = http.request(options, function (bpmHttpRes) {
      var response = '';
      console.log('STATUS: ' + bpmHttpRes.statusCode)
      console.log('HEADERS: ' + JSON.stringify(bpmHttpRes.headers))
      bpmHttpRes.setEncoding('utf8')
      bpmHttpRes.on('data', function (chunk) {
        response += chunk;
      })
      bpmHttpRes.on('end', function () {
        res.send(response);
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  // GET REST endpoint - query params may or may not be populated
  bpm.post('/getProcess', function (req, res) {
    // Prepare BPM REST call
    var options = {
      hostname: req.body.params.ip,
      port: req.body.params.port,
      path: '/business-central/rest/runtime/' + process.env.BPM_PROCESS_DEPLOYMENTID + '/process/' + process.env.BPM_PROCESS_PROCESSDEFID,
      method: 'GET',
      auth: req.body.params.username + ':' + req.body.params.password,
      headers: {
        'Accept': 'application/json'
      }
    }
    // Execute BPM REST call
    var bpmHttpReq = http.request(options, function (bpmHttpRes) {
      var response = '';
      console.log('STATUS: ' + bpmHttpRes.statusCode)
      console.log('HEADERS: ' + JSON.stringify(bpmHttpRes.headers))
      bpmHttpRes.setEncoding('utf8')
      bpmHttpRes.on('data', function (chunk) {
        response += chunk;
      })
      bpmHttpRes.on('end', function () {
        res.send(response);
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/loadTasks', function(req, res) {
    var options = {
      hostname: req.body.params.ip,
      port: req.body.params.port,
      path: '/business-central/rest/task/query',
      method: 'GET',
      auth: req.body.params.username + ':' + req.body.params.password,
      headers: {
        'Accept': 'application/json'
      }
    }
    // Execute BPM REST call
    var bpmHttpReq = http.request(options, function (bpmHttpRes) {
      var response = '';
      console.log('STATUS: ' + bpmHttpRes.statusCode)
      console.log('HEADERS: ' + JSON.stringify(bpmHttpRes.headers))
      bpmHttpRes.setEncoding('utf8')
      bpmHttpRes.on('data', function (chunk) {
        response += chunk;
      })
      bpmHttpRes.on('end', function () {
        res.send(response);
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/loadTaskContent', function(req, res) {
    var options = {
      hostname: req.body.params.ip,
      port: req.body.params.port,
      path: '/business-central/rest/task/' + req.body.params.taskId + '/content',
      method: 'GET',
      auth: req.body.params.username + ':' + req.body.params.password,
      headers: {
        'Accept': 'application/json'
      }
    }
    // Execute BPM REST call
    var bpmHttpReq = http.request(options, function (bpmHttpRes) {
      console.log('STATUS: ' + bpmHttpRes.statusCode)
      console.log('HEADERS: ' + JSON.stringify(bpmHttpRes.headers))
      bpmHttpRes.setEncoding('utf8')
      bpmHttpRes.on('data', function (chunk) {
        // Write JSON response
        res.send(chunk)
      })
      bpmHttpRes.on('end', function () {})
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/completeTask', function(req, res) {
    var options = {
      hostname: req.body.params.ip,
      port: req.body.params.port,
      path: '/business-central/rest/task/' + req.body.params.taskId + '/complete',
      method: 'POST',
      auth: req.body.params.username + ':' + req.body.params.password,
      headers: {
        'Accept': 'application/json'
      }
    }
    // Execute BPM REST call
    var bpmHttpReq = http.request(options, function (bpmHttpRes) {
      console.log('STATUS: ' + bpmHttpRes.statusCode)
      console.log('HEADERS: ' + JSON.stringify(bpmHttpRes.headers))
      bpmHttpRes.setEncoding('utf8')
      bpmHttpRes.on('data', function (chunk) {
        // Write JSON response
        res.send(chunk)
      })
      bpmHttpRes.on('end', function () {})
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/claimTask', function(req, res) {
    var options = {
      hostname: req.body.params.ip,
      port: req.body.params.port,
      path: '/business-central/rest/task/' + req.body.params.taskId + '/claim',
      method: 'POST',
      auth: req.body.params.username + ':' + req.body.params.password,
      headers: {
        'Accept': 'application/json'
      }
    }
    // Execute BPM REST call
    var bpmHttpReq = http.request(options, function (bpmHttpRes) {
      console.log('STATUS: ' + bpmHttpRes.statusCode)
      console.log('HEADERS: ' + JSON.stringify(bpmHttpRes.headers))
      bpmHttpRes.setEncoding('utf8')
      bpmHttpRes.on('data', function (chunk) {
        // Write JSON response
        res.send(chunk)
      })
      bpmHttpRes.on('end', function () {})
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/startTask', function(req, res) {
    var options = {
      hostname: req.body.params.ip,
      port: req.body.params.port,
      path: '/business-central/rest/task/' + req.body.params.taskId + '/start',
      method: 'POST',
      auth: req.body.params.username + ':' + req.body.params.password,
      headers: {
        'Accept': 'application/json'
      }
    }
    // Execute BPM REST call
    var bpmHttpReq = http.request(options, function (bpmHttpRes) {
      console.log('STATUS: ' + bpmHttpRes.statusCode)
      console.log('HEADERS: ' + JSON.stringify(bpmHttpRes.headers))
      bpmHttpRes.setEncoding('utf8')
      bpmHttpRes.on('data', function (chunk) {
        // Write JSON response
        res.send(chunk)
      })
      bpmHttpRes.on('end', function () {})
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/releaseTask', function(req, res) {
    var options = {
      hostname: req.body.params.ip,
      port: req.body.params.port,
      path: '/business-central/rest/task/' + req.body.params.taskId + '/release',
      method: 'POST',
      auth: req.body.params.username + ':' + req.body.params.password,
      headers: {
        'Accept': 'application/json'
      }
    }
    // Execute BPM REST call
    var bpmHttpReq = http.request(options, function (bpmHttpRes) {
      console.log('STATUS: ' + bpmHttpRes.statusCode)
      console.log('HEADERS: ' + JSON.stringify(bpmHttpRes.headers))
      bpmHttpRes.setEncoding('utf8')
      bpmHttpRes.on('data', function (chunk) {
        // Write JSON response
        res.send(chunk)
      })
      bpmHttpRes.on('end', function () {})
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  return bpm
}





function createQueryParameterMapString (jsonInput) {
  var httpQueryParams = ''
  for (var key in jsonInput) {
    if (jsonInput.hasOwnProperty(key)) {
      httpQueryParams += '&map_' + key + '=' + jsonInput[key]
    }
  }
  return encodeURI(httpQueryParams)
}

module.exports = bpmRoute
