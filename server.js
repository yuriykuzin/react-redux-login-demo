var http = require('http');
var static = require('node-static');
var file = new static.Server('./build');

var portMockServer = process.env.PORT || 8080;

http.createServer(function(req, res) {
  var body = '';
  var resLogin = 'Denied';
  var reqLogin;

  if (req.url === '/login' && req.method === 'POST') {
    req.on('data', function(data) {
      body += data;
      
      // Standard procedure to preventing flood request
      if (body.length > 1e6) {
        body = '';
        res.writeHead(413, {
          'Content-Type': 'text/plain'
        }).end();
        req.connection.destroy();
      }
    });
    
    req.on('end', function() {
      try {
        var reqLogin = JSON.parse(body);
        if (reqLogin && reqLogin.Username === 'User' && reqLogin.Password === 'Password') {
          resLogin = 'Logged';
        }
      } catch (err) {
        console.log(err);
      }

      setTimeout(function() {
        res.writeHead(200, {
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'public, max-age=86400'
        });
        res.write(JSON.stringify({
          Auth: resLogin,
          Language: "EN"
        }));
        res.end();
      }, 1000);
    });
  } else {
    
    // Serving static files
    file.serve(req, res);
  }
}).listen(portMockServer);

console.log('Server is running on port ' + portMockServer);
