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
    if (socketMap[(count - 1)]) {
      socketMap[(count - 1)].emit("first");
      socket.emit("second", count);
    } else {
      socket.emit("leave");
    }
  }
  socket.on('go', function (i, j, myNum, isFail) {
    if (myNum % 2 === 1) {
      socketMap[(myNum + 1)].emit("go", i, j);
    } else {
      socketMap[(myNum - 1)].emit("go", i, j);
    }
    if (isFail) {
      if (myNum % 2 === 1) {
        socketMap[(myNum + 1)].emit("fail");
      } else {
        socketMap[(myNum - 1)].emit("fail");
      }
    }
  });
});