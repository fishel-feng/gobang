var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// 存放在线用户k-编号v-socket
var socketMap = {};
// 自增编号
var number = 0;

server.listen(5001);

app.use(express.static('public'));

io.on('connection', function (socket) {
  number++;
  socket.clientNum = number;
  socketMap[number] = socket;
  if (number % 2 === 1) {
    socket.emit('waiting', number);
  } else {
    if (socketMap[number - 1]) {
      socketMap[number - 1].emit("first");
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
    if (socket.clientNum % 2 !== 0 && !socketMap[getMatch(socket.clientNum)]) {
      number++;
    }
    if (socketMap[getMatch(socket.clientNum)]) {
      socketMap[getMatch(socket.clientNum)].emit('leave');
      delete(socketMap[getMatch(socket.clientNum)]);
    }
  });
});

// 从1开始，奇数匹配加一的数，偶数匹配减一的数
function getMatch(num) {
  if (num % 2 === 1) {
    return num + 1;
  } else {
    return num - 1;
  }
}