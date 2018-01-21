var socket;
var myNum;

function personPlay() {
  socket = io.connect('http://192.168.0.115:5001');
  socket.on('waiting', function (count, num) {
    textContainer.innerText = '等待玩家进入，当前在线' + count + '人';
    myNum = num;
  });
  socket.on('first', function () {
    textContainer.innerText = '游戏开始,请落子';
    me = true;
    over = false;
  });
  socket.on('second', function (count, num) {
    textContainer.innerText = '游戏开始,等待对方落子';
    myNum = num;
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
      reset();
      me = true;
    });
    over = true;
  });
  socket.on('leave', function () {
    textContainer.innerText = '对方掉线';
  });
}

function personGo(i, j, isFail) {
  socket.emit('go', i, j, myNum, isFail);
  textContainer.innerText = '等待对方落子';
}
