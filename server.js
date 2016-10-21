var http = require('http');
var static = require('node-static');
var file = new static.Server('./build');
var mockserver = require('mockserver-grunt');
var mockServer = require('mockserver-client');
var mockServerClient = mockServer.mockServerClient;

var portMockServer = process.env.PORT || 8080;
var ipMockServer = process.env.IP || '0.0.0.0';

http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(8082);

console.log('Static server is running on port 8082');

mockserver.start_mockserver({
  serverPort: portMockServer,
  verbose: true
});

console.log('Mock server is running on port ' + portMockServer);
console.log('IP address is ' + ipMockServer);

setTimeout(function() {

  mockServerClient(ipMockServer, portMockServer).mockAnyResponse({
    'httpRequest': {
      'method': 'GET'
    },
    "httpForward": {
      "host": "0.0.0.0",
      "port": 8082,
      "scheme": "HTTP"
    },
    'times': {
      'unlimited': true
    }
  });
  
  mockServerClient(ipMockServer, portMockServer).mockAnyResponse({
    "httpRequest": {
      "method": "POST",
      "path": "/login",
      "body": {
        "type": "JSON",
        "value": JSON.stringify({
          Username: "User",
          Password: "Password"
        }),
        "matchType": "STRICT"
      }
    },
    "httpResponse": {
      "statusCode": 200,
      "headers": [{
        "name": "Content-Type",
        "values": ["application/json; charset=utf-8"]
      }, {
        "name": "Cache-Control",
        "values": ["public, max-age=86400"]
      }],
      "body": JSON.stringify({
        Auth: "Logged",
        Language: "EN"
      }),
      "delay": {
        "timeUnit": "SECONDS",
        "value": 1
      }
    },
    "times": {
      "unlimited": true
    }
  });   

  mockServerClient(ipMockServer, portMockServer).mockAnyResponse({
    "httpRequest": {
      "method": "POST",
      "path": "/login",
      "body": {
        "type": "JSON",
        "value": JSON.stringify({
          Username: "foo",
          Password: "bar"
        }),
        "matchType": "STRICT"
      }
    },
    "httpResponse": {
      "statusCode": 200,
      "headers": [{
        "name": "Content-Type",
        "values": ["application/json; charset=utf-8"]
      }, {
        "name": "Cache-Control",
        "values": ["public, max-age=86400"]
      }],
      "body": JSON.stringify({
        Auth: "Denied"
      }),
      "delay": {
        "timeUnit": "SECONDS",
        "value": 1
      }
    },
    "times": {
      "unlimited": true
    }
  });

  console.log("Mock server initiated");

}, 5000);
