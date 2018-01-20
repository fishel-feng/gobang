function personPlay() {
  var socket = io.connect('http://localhost:5001');
  var textContainer = document.getElementById('text-container');
  socket.on('waiting', function (count) {
    textContainer.innerText = '等待玩家进入，当前在线' + count + '人';
  });
  socket.on('first', function () {
    textContainer.innerText = '游戏开始,请落子';
  });
  socket.on('second', function () {
    textContainer.innerText = '游戏开始,等待对方落子';
  });
  socket.on('leave', function () {
    textContainer.innerText = '对方掉线';
  });
}

