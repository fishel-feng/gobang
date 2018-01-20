var socket;
var myNum;

function personPlay() {
  socket = io.connect('http://localhost:5001');
  var textContainer = document.getElementById('text-container');
  socket.on('waiting', function (count) {
    textContainer.innerText = '等待玩家进入，当前在线' + count + '人';
    myNum = count;
  });
  socket.on('first', function () {
    textContainer.innerText = '游戏开始,请落子';
    me = true;
  });
  socket.on('second', function () {
    textContainer.innerText = '游戏开始,等待对方落子';
  });
  socket.on('go', function (i, j) {
    oneStep(i, j, false);
  });
  socket.on('leave', function () {
    textContainer.innerText = '对方掉线';
  });
}

function personGo(i, j) {
  socket.emit('go', i, j, myNum);
}
