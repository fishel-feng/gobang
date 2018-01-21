var waiting = false;

function personPlay() {
  socket = io.connect('http://192.168.0.115:5001');
  socket.on('waiting', function () {
    waiting = true;
    textContainer.innerText = '等待玩家进入';
  });
  socket.on('first', function () {
    textContainer.innerText = '游戏开始,请落子';
    waiting = false;
    me = true;
    over = false;
  });
  socket.on('second', function () {
    textContainer.innerText = '游戏开始,等待对方落子';
    over = false;
  });
  socket.on('go', function (i, j) {
    oneStep(i, j, false);
    chessBoard[i][j] = 2;
    me = true;
    textContainer.innerText = '请落子';
  });
  socket.on('fail', function () {
    showDialog('你输了,再开一局？', function () {
      socket.disconnect();
      reset();
      personPlay();
    });
    over = true;
  });
  socket.on('leave', function () {
    showDialog('对方离开，是否重新匹配？', function () {
      reset();
      personPlay();
    });
  });
}

function personGo(i, j, isFail) {
  socket.emit('go', i, j, isFail);
  textContainer.innerText = '等待对方落子';
}
