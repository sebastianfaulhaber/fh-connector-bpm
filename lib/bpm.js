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
    console.log(new Date(), '>>> POST ' + req.originalUrl + ' req.query=' + JSON.stringify(req.query) + ' / req.body=' + JSON.stringify(req.body))

    // Prepare BPM REST call
    var options = getDefaultRESTRequestOptions()
    options.path = '/business-central/rest/runtime/' + process.env.BPM_PROCESS_DEPLOYMENTID + '/process/' + process.env.BPM_PROCESS_PROCESSDEFID + '/start?' + createQueryParameterMapString(req.body)
    options.method = 'POST'
    console.log(new Date(), '>>>> Calling BPM REST endpoint with the following config: ' + options.stringify())

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
      res.json({error: 'Problem with request:' + e.message})
    })
    bpmHttpReq.end()
  })

  // GET REST endpoint - query params may or may not be populated
  bpm.post('/getProcessInstance', function (req, res) {
    console.log(new Date(), '>>> POST ' + req.originalUrl + ' req.query=' + JSON.stringify(req.query) + ' / req.body=' + JSON.stringify(req.body))

    // Prepare BPM REST call
    var options = getDefaultRESTRequestOptions()
    options.path = '/business-central/rest/runtime/' + process.env.BPM_PROCESS_DEPLOYMENTID + '/withvars/process/instance/' + req.body.procInstId
    options.method = 'GET'

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
      res.json({error: 'Problem with request:' + e.message})
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
  return httpQueryParams
}

function getDefaultRESTRequestOptions () {
  return {
    hostname: process.env.BPM_URI_HOSTNAME,
    port: process.env.BPM_URI_PORT,
    path: '/business-central/rest/runtime/' + process.env.BPM_PROCESS_DEPLOYMENTID + '/process/' + process.env.BPM_PROCESS_PROCESSDEFID,
    method: 'POST',
    auth: process.env.BPM_AUTH_USERNAME + ':' + process.env.BPM_AUTH_PASSWORD,
    headers: {
      'Accept': 'application/json'
    }
  }
}

module.exports = bpmRoute
