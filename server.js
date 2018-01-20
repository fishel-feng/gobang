var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(5001);

app.use(express.static('public'));

io.on('connection', function (socket) {
  socket.emit('message', 'hello');
  socket.on('back', function (data) {
    console.log(data);
  });
});