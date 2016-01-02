var https = require('https')
var server = require('http').createServer();
var express = require('express');
var socketio = require('socket.io');

var app = express();
var router = express.Router();

server.on('request', app);
var io = socketio(server);

io.on('connection', function (socket) {
    // This function receives the newly connected socket.
    // This function will be called for EACH browser that connects to our server.
    console.log('A new client has connected!');
    console.log(socket.id);

    socket.on('newQCard', function(){
      console.log("made it here")
   //   that.setState({currentQ: this.pickQ() })
      var startingQs= ["When someone texts back 'k'", "When Netflix asks if you're still there", "When you're about to leave but your song comes on"];
      var currentQ=  startingQs[Math.floor(Math.random()*(3 -0))]

      io.emit('setQ', currentQ )
    })

    socket.on('newGif', function(gif){
      console.log("adding gif")
      io.emit('addGif', gif )
    })



    socket.on('disconnect',function() {
      console.log('disconnected');
    })
});


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