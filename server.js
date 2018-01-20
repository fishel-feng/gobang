var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var socketMap = {};
var count = 0;

server.listen(5001);

app.use(express.static('public'));

io.on('connection', function (socket) {
  count++;
  socket.clientNum = count;
  socketMap[count] = socket;
  if (count % 2 === 1) {
    socket.emit('waiting', count);
  } else {
    if (socketMap[(count - 1)]){
      socketMap[(count - 1)].emit("first");
      socket.emit("second");
    }else {
      socket.emit("leave");
    }
  }
});