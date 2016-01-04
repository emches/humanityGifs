var https = require('https')
var server = require('http').createServer();
var express = require('express');
var socketio = require('socket.io');
var models = require('./models.js');
var Question = models.Question;
var Gif = models.Gif;

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

     Question.find({"used": false})
        .then(function(all){
            console.log("all", all)
           if (all.length===0){
            console.log("no more")
            io.emit('setQ', "NO MORE QUESTIONS IN QUEUE" )
        } else {
             var currentQ=  all[Math.floor(Math.random()*(all.length -0))]
             console.log("startingQ", currentQ)
             Question.findOne(currentQ)
                .then(function(q){
                  console.log("found q", q)
                  q.used = true;
                  console.log("saved q", q)

                  q.save();
                  io.emit('setQ', currentQ.title )

                })
          }
        });

    })

    socket.on('newGif', function(gif, userName){
      console.log("adding gif")
      io.emit('addGif', gif, userName )
    })


    socket.on('newGif', function(gif, userName){
      console.log("adding gif")
      io.emit('addGif', gif, userName )
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

app.get('/test', function (req, res) {
    console.log("hello")

});

app.post('/users', function (req, res) {
    console.log("hit route", req)

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