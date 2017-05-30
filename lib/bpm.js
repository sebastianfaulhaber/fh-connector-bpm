var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var http = require('http')

function bpmRoute () {
  var bpm = new express.Router()
  bpm.use(cors())
  bpm.use(bodyParser.json())

  bpm.get('/processImage', function (req, res) {
    // Prepare BPM REST call
    var method = 'GET';
    var path = '/business-central/rest/runtime/' + process.env.BPM_PROCESS_DEPLOYMENTID + '/process/' + process.env.BPM_PROCESS_PROCESSDEFID + '/image';
    if (req.query.id)
      path += '/' +req.query.id;
    var options = getCredentialsForBpmConnection(req,method,path);
    // Execute BPM REST call
    console.log('/processImage: (' + new Date() + ')\n' + 'PATH: ' + path + '\n');

    res.setHeader('content-type', 'image/svg+xml; charset=utf-8');

    var bpmHttpReq = http.request(options, function (bpmHttpRes) {
      var response = '';
      console.log('STATUS: ' + bpmHttpRes.statusCode);
      console.log('HEADERS: ' + JSON.stringify(bpmHttpRes.headers));

      bpmHttpRes.setEncoding('utf-8');
      bpmHttpRes.on('data', function (chunk) {
        response += chunk;
        //res.charset = "utf8"
      });
      bpmHttpRes.on('end', function () {
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          //res.set('content-type', 'image/svg+xml; charset=utf-8');
          res.send(response);
        }
      });
    });
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    });
    bpmHttpReq.end();
  })

  bpm.post('/startProcess', function (req, res) {
    // Prepare BPM REST call
    var method = 'POST';
    var path = '/business-central/rest/runtime/' + process.env.BPM_PROCESS_DEPLOYMENTID + '/process/' + process.env.BPM_PROCESS_PROCESSDEFID + '/start?' + createQueryParameterMapString(req.body);
    var options = getCredentialsForBpmConnection(req,method,path);
    /*
    var options = {
      hostname: 'localhost',
      port: 8080,
      //path: '/business-central/rest/mobile:request-processing:1.0/process/mobile.request-processing/start?param1=1',
      path: '/business-central/rest/deployment',
      method: 'GET',
      auth: 'bpmsAdmin' + ':' + 'r0tm0s!!',
      headers: {
        'Accept': 'application/json'
      }
    }
    */
    // Execute BPM REST call
    console.log('/startProcess: (' + new Date() + ')\n' + 'PATH: ' + path + '\n');

    var bpmHttpReq = http.request(options, function (bpmHttpRes) {
      var response = '';
      console.log('STATUS: ' + bpmHttpRes.statusCode)
      console.log('HEADERS: ' + JSON.stringify(bpmHttpRes.headers))
      bpmHttpRes.setEncoding('utf8')
      bpmHttpRes.on('data', function (chunk) {
        response += chunk;
      })
      bpmHttpRes.on('end', function () {
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/getProcessInstance', function (req, res) {
    // Prepare BPM REST call
    var method = 'GET';
    var path = '/business-central/rest/runtime/' + process.env.BPM_PROCESS_DEPLOYMENTID + '/process/' + process.env.BPM_PROCESS_PROCESSDEFID;
    var options = getCredentialsForBpmConnection(req,method,path);

    console.log('/getProcessInstance: (' + new Date() + ')\n' + 'PATH: ' + path + '\n' + 'OPTIONS: ' + JSON.stringify(options) + '\n');


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
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/getProcessInstanceList', function (req, res) {
    // Prepare BPM REST call
    var method = 'GET';
    var path = '/business-central/rest/query/runtime/process';
    var options = getCredentialsForBpmConnection(req,method,path);

    console.log('/getProcessInstanceList: (' + new Date() + ')\n' + 'PATH: ' + path + '\n' + 'OPTIONS: ' + JSON.stringify(options) + '\n');

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
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/loadProcessContent', function (req, res) {
    // Prepare BPM REST call
    var method = 'GET';
    var path = '/business-central/rest/query/runtime/process';
    var options = getCredentialsForBpmConnection(req,method,path);

    console.log('/loadProcessContent: (' + new Date() + ')\n' + 'PATH: ' + path + '\n' + 'OPTIONS: ' + JSON.stringify(options) + '\n');


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
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/loadTasks', function(req, res) {
    // Prepare BPM REST call
    var method = 'GET';
    var path = '/business-central/rest/task/query';
    var options = getCredentialsForBpmConnection(req,method,path);

    console.log('/loadTasks: (' + new Date() + ')\n' + 'PATH: ' + path + '\n' + 'OPTIONS: ' + JSON.stringify(options) + '\n');


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
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/runtimeTaskQuery', function(req, res) {
    // Prepare BPM REST call
    var method = 'GET';
    var path = '/business-central/rest/query/runtime/task';
    var options = getCredentialsForBpmConnection(req,method,path);

    console.log('/runtimeTaskQuery: (' + new Date() + ')\n' + 'Options: ' + JSON.stringify(options) + '\n');

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
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/loadTaskContent', function(req, res) {
    // Prepare BPM REST call
    var method = 'GET';
    var path = '/business-central/rest/task/' + req.body.taskId + '/content';
    var options = getCredentialsForBpmConnection(req,method,path);
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
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/completeTask', function(req, res) {
    // Prepare BPM REST call
    var method = 'POST';
    var path = '/business-central/rest/task/' + req.body.taskId + '/complete?' + createQueryParameterMapString(req.body);
    console.log(path);
    var options = getCredentialsForBpmConnection(req,method,path);
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
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/claimTask', function(req, res) {
    // Prepare BPM REST call
    var method = 'POST';
    var path = '/business-central/rest/task/' + req.body.taskId + '/claim';
    var options = getCredentialsForBpmConnection(req,method,path);
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
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/startTask', function(req, res) {
    // Prepare BPM REST call
    var method = 'POST';
    var path = '/business-central/rest/task/' + req.body.taskId + '/start';
    var options = getCredentialsForBpmConnection(req,method,path);
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
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
    })
    bpmHttpReq.on('error', function (e) {
      res.json({error: 'Problem with request:' + e.message, reqbody: options})
    })
    bpmHttpReq.end()
  })

  bpm.post('/releaseTask', function(req, res) {
    // Prepare BPM REST call
    var method = 'POST';
    var path = '/business-central/rest/task/' + req.body.taskId + '/release';
    var options = getCredentialsForBpmConnection(req,method,path);
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
        if(bpmHttpRes.statusCode == '401'){
          var statusCode = bpmHttpRes.statusCode;
          res.send(statusCode);
        }else{
          res.send(response);
        }
      })
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
        if(!isObject(jsonInput[key])){
          httpQueryParams += '&map_' + key + '=' + jsonInput[key]
        }
      }
    }
  return encodeURI(httpQueryParams)
}

function isObject(val) {
    if (val === null) { return false;}
    return ( (typeof val === 'function') || (typeof val === 'object') );
}


  function getCredentialsForBpmConnection (req, method, path){
    var username = null;
    var password = null;
    var ip = null;
    var port = null;

    if(isBlank(process.env.BPM_AUTH_USERNAME)){
      username = req.body.params.username;
    }else{
      username = process.env.BPM_AUTH_USERNAME;
    }

    if(isBlank(process.env.BPM_AUTH_PASSWORD)){
      password = req.body.params.password;
    }else{
      password = process.env.BPM_AUTH_PASSWORD;
    }

    if(isBlank(process.env.BPM_URI_HOSTNAME)){
      ip = req.body.params.ip;
    }else{
      ip = process.env.BPM_URI_HOSTNAME;
    }

    if(isBlank(process.env.BPM_URI_PORT)){
      port = req.body.params.port;
    }else{
      port = process.env.BPM_URI_PORT;
    }

    var options = {
      hostname: ip,
      port: port,
      path: path,
      method: method,
      auth: username + ':' + password,
      headers: {
        'Accept': 'application/json'
      }
    }

    return options;
  }

  function isBlank(str) {
    return (!str || /^\s*$/.test(str));
}
module.exports = bpmRoute
