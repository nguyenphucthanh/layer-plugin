var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

var port = process.env.PORT || 3000;
app.set('port', port);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, '../public')));

http.createServer(app).listen(port, function() {
  console.log('Frontend template is running on port ' + port);
});
