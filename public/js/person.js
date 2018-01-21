var waiting = false;

// 联机游戏
function personPlay() {
  socket = io.connect('http://127.0.0.1:5001');
  socket.on('waiting', function () {
    waiting = true;
    me = false;
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
    me = false;
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
    over = true;
    showDialog('对方离开，是否重新匹配？', function () {
      reset();
      personPlay();
    });
  });
}

// 落子
function personGo(i, j, isFail) {
  socket.emit('go', i, j, isFail);
  textContainer.innerText = '等待对方落子';
}
