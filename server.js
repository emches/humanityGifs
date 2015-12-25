var https = require('https')
var server = require('http').createServer();
var express = require('express');
var app = express();
var router = express.Router();

server.on('request', app);
server.listen(3000, function () {
    console.log('Server listening on port 3000!');
});

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));

app.get('/', function (req, res) {
    res.sendFile('index.html' , { root : __dirname});
});

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   server.on('request', expressApp);
// server.listen(8080, function () {
//     console.log('Server listening on port 8080!');
// });

//   console.log('Example app listening at http://%s:%s', host, port);
// });