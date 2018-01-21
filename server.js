var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var socketMap = {};
var num = 0;
var count = 0;

server.listen(5001);

app.use(express.static('public'));

function getMatch(num) {
  if (myNum % 2 === 1) {
    return num + 1;
  } else {
    return num - 1;
  }
}

io.on('connection', function (socket) {
  num++;
  count++;
  socket.clientNum = count;
  socketMap[count] = socket;
  if (count % 2 === 1) {
    socket.emit('waiting', count, num);
  } else {
    if (socketMap[(count - 1)]) {
      socketMap[(count - 1)].emit("first");
      socket.emit("second", count, num);
    } else {
      socket.emit("leave");
    }
  }
  socket.on('go', function (i, j, myNum, isFail) {
    socketMap[getMatch(myNum)].emit("go", i, j);
    if (isFail) {
      socketMap[getMatch(myNum)].emit("fail");
    }
  });
});