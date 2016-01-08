var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var http = require('http')

function bpmRoute () {
  var bpm = new express.Router()
  bpm.use(cors())
  bpm.use(bodyParser())

  // GET REST endpoint - query params may or may not be populated
  bpm.post('/startProcess', function (req, res) {
    console.log(new Date(), 'In bpm route GET / req.query=', req.query)
    var world = req.query && req.query.bpm ? req.query.bpm : 'World'

    // Prepare BPM rest query parameters
    // TBD

    // Prepare BPM REST call
    var options = {
      hostname: process.env.BPM_URI_HOSTNAME,
      port: process.env.BPM_URI_PORT,
      path: '/business-central/rest/runtime/' + process.env.BPM_PROCESS_DEPLOYMENTID + '/process/' + process.env.BPM_PROCESS_PROCESSDEFID + '/start',
      method: 'POST',
      auth: process.env.BPM_AUTH_USERNAME + ':' + process.env.BPM_AUTH_PASSWORD,
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
      res.json({error: 'Problem with request:' + e.message})
    })
    bpmHttpReq.end()
  })

  return bpm
}

module.exports = bpmRoute
