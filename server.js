var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static('public'));

// Environment defined port, or 3000
var port = process.env.PORT || 3000;

// Express router
var router = express.Router();

// Body-parser package
app.use(bodyParser.urlencoded({
  extended: true,
}));

var server = app.listen(port, 'localhost', function(){
  var port = server.address().port;
  var host = server.address().address;
  console.log('Server listening at http://' + host + ':' + port);
});
