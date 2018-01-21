var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var socketMap = {};
var number = 0;

server.listen(5001);

app.use(express.static('public'));

function getMatch(num) {
  if (num % 2 === 1) {
    return num + 1;
  } else {
    return num - 1;
  }
}

io.on('connection', function (socket) {
  number++;
  socket.clientNum = number;
  socketMap[number] = socket;
  if (number % 2 === 1) {
    socket.emit('waiting', number);
  } else {
    if (socketMap[(number - 1)]) {
      socketMap[(number - 1)].emit("first");
      socket.emit("second", number);
    } else {
      socket.emit("leave");
    }
  }
  socket.on('go', function (i, j, isFail) {
    socketMap[getMatch(socket.clientNum)].emit("go", i, j);
    if (isFail) {
      socketMap[getMatch(socket.clientNum)].emit("fail");
    }
  });
  socket.on("disconnect", function () {
    delete(socketMap[socket.clientNum]);
    if (number % 2 === 0 && socketMap[getMatch(socket.clientNum)]) {
      socketMap[getMatch(socket.clientNum)].emit('leave');
      delete(socketMap[getMatch(socket.clientNum)]);
    } else {
      number++;
    }
  });
});