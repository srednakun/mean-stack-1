var express = require("express");
var app = express();

app.use('/', express.static(__dirname + '/public'));

// Environment defined port, or 3000
var port = process.env.PORT || 3000;


var server = app.listen(port, 'localhost', function(){
  var port = server.address().port;
  var host = server.address().address;
  console.log('Server listening at http://' + host + ':' + port);
});
