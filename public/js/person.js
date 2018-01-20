var textContainer = document.getElementById('text-container');
var socket;
var myNum;

function personPlay() {
  socket = io.connect('http://192.168.0.115:5001');
  socket.on('waiting', function (count) {
    textContainer.innerText = '等待玩家进入，当前在线' + count + '人';
    myNum = count;
  });
  socket.on('first', function () {
    textContainer.innerText = '游戏开始,请落子';
    me = true;
  });
  socket.on('second', function (count) {
    textContainer.innerText = '游戏开始,等待对方落子';
    myNum = count;
  });
  socket.on('go', function (i, j) {
    oneStep(i, j, false);
    chessBoard[i][j] = 2;
    me = true;
    textContainer.innerText = '请落子';
  });
  socket.on('fail', function () {
    showResult('你输了');
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
