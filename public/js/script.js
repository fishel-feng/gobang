var canvasWidth = canvasHeight = Math.min(800, document.documentElement.clientWidth - 20);

var textContainer = document.getElementById('text-container');

var canvas = document.getElementById('chess');
var context = canvas.getContext('2d');
var computer = document.getElementById('computer');
var person = document.getElementById('person');

var dialog = document.getElementById('dialog');
var dialogTitle = document.getElementById('dialog-title');
var btnBack = document.getElementById('btn_back');
var btnOk = document.getElementById('btn_ok');

var ROW_COUNT = 15;

var socket;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var over = true;
var i = 0, j = 0, k = 0;
// 棋盘
var chessBoard = [];
// 我的赢法统计数组
var myWin = [];
// 对手的赢法统计数组
var rivalWin = [];

// 赢法数组
var wins = [];
// 赢法数量
var count = 0;

// 初始化赢法数组
for (i = 0; i < ROW_COUNT; i++) {
  wins[i] = [];
  for (j = 0; j < ROW_COUNT; j++) {
    wins[i][j] = [];
  }
}

// 遍历横，纵，正对角线，反对角线四种赢法
traverseWin();

// 初始化
initParams();

var me = false;
var isComputer;

var boxWidth = (canvasWidth - 10) / ROW_COUNT;
var radius = boxWidth / 2 * 0.8;
var realPadding = 5 + boxWidth / 2;
window.onload = function () {
  drawChessBoard();
};

// 绘制棋盘
function drawChessBoard() {
  context.strokeStyle = '#9f7a59';
  context.lineWidth = 2;
  context.beginPath();
  for (var i = 0; i < 15; i++) {
    context.moveTo(realPadding + i * boxWidth, realPadding);
    context.lineTo(realPadding + i * boxWidth, canvasHeight - realPadding);
    context.stroke();
    context.moveTo(realPadding, realPadding + i * boxWidth);
    context.lineTo(canvasHeight - realPadding, realPadding + i * boxWidth);
    context.stroke();
  }
}

// 落子
function oneStep(i, j, me) {
  context.beginPath();
  context.arc(realPadding + i * boxWidth, realPadding + j * boxWidth, radius, 0, 2 * Math.PI);
  context.closePath();
  var gradient = context.createRadialGradient(realPadding + i * boxWidth + 2, realPadding + j * boxWidth - 2, radius, realPadding + i * boxWidth, realPadding + j * boxWidth, 0);
  if (me) {
    gradient.addColorStop(0, '#0a0a0a');
    gradient.addColorStop(1, '#636766');
  } else {
    gradient.addColorStop(0, '#9d9d9d');
    gradient.addColorStop(1, '#f9f9f9');
  }
  context.fillStyle = gradient;
  context.fill();
}

canvas.onclick = function (e) {
  if (over) {
    return;
  }
  if (!me) {
    return;
  }
  var x = e.offsetX;
  var y = e.offsetY;
  var i = Math.floor(x / boxWidth);
  var j = Math.floor(y / boxWidth);
  if (i > 14 || j > 14) {
    return
  }
  if (chessBoard[i][j] === 0) {
    oneStep(i, j, me);
    if (me) {
      chessBoard[i][j] = 1;
    } else {
      chessBoard[i][j] = 2;
    }
    chessBoard[i][j] = 1;
    for (var k = 0; k < count; k++) {
      if (wins[i][j][k]) {
        myWin[k]++;
        rivalWin[k] = 6;
        if (myWin[k] === 5) {
          textContainer.innerText = '游戏结束';
          showDialog('你赢了,再开一局？', function () {
            if (isComputer) {
              reset();
              me = true;
            }
            if (!isComputer) {
              socket.disconnect();
              reset();
              personPlay();
            }
          });
          if (!isComputer) {
            personGo(i, j, true);
          }
          over = true;
        }
      }
    }
    if (!over) {
      me = !me;
      if (isComputer) {
        computerAI();
      } else {
        personGo(i, j);
      }
    }
  }
};

// 点击人机对战
computer.onclick = function () {
  if (!over) {
    if (isComputer) {
      showDialog('确定放弃本局,重开一局？', function () {
        textContainer.innerText = '游戏开始';
        reset();
      });
    } else {
      showDialog('确定放弃本局,重开一局？', function () {
        socket.disconnect();
        isComputer = true;
        reset();
      });
    }
  } else {
    textContainer.innerText = '游戏开始';
    isComputer = true;
    reset();
  }
};


// 点击联网对战
person.onclick = function () {
  if (waiting) {
    showDialog('是否放弃等待，重新匹配？', function () {
      socket.disconnect();
      personPlay();
    });
  } else if (!over) {
    showDialog('确定放弃本局,重开一局？', function () {
      isComputer = false;
      socket.disconnect();
      reset();
      personPlay();
    });
  } else {
    isComputer = false;
    over = false;
    reset();
    personPlay();
  }
};

// 遍历横，纵，正对角线，反对角线四种赢法
function traverseWin() {
  for (i = 0; i < ROW_COUNT; i++) {
    for (j = 0; j < ROW_COUNT - 4; j++) {
      for (k = 0; k < 5; k++) {
        wins[i][j + k][count] = true;
      }
      count++;
    }
  }

  for (i = 0; i < ROW_COUNT; i++) {
    for (j = 0; j < ROW_COUNT - 4; j++) {
      for (k = 0; k < 5; k++) {
        wins[j + k][i][count] = true;
      }
      count++;
    }
  }

  for (i = 0; i < ROW_COUNT - 4; i++) {
    for (j = 0; j < ROW_COUNT - 4; j++) {
      for (k = 0; k < 5; k++) {
        wins[i + k][j + k][count] = true;
      }
      count++;
    }
  }

  for (i = 0; i < ROW_COUNT - 4; i++) {
    for (j = ROW_COUNT - 1; j > 3; j--) {
      for (k = 0; k < 5; k++) {
        wins[i + k][j - k][count] = true;
      }
      count++;
    }
  }
}

// 显示dialog
function showDialog(result, ok) {
  dialogTitle.innerText = result;
  btnOk.innerText = '确定';
  btnOk.onclick = function () {
    ok();
    dialog.close();
  };
  btnBack.innerText = '取消';
  btnBack.onclick = function () {
    dialog.close();
  };
  dialog.showModal();
}

// 初始化
function initParams() {
  // 初始化棋盘
  for (i = 0; i < ROW_COUNT; i++) {
    chessBoard[i] = [];
    for (j = 0; j < ROW_COUNT; j++) {
      chessBoard[i][j] = 0;
    }
  }
  // 初始化赢法统计数组
  for (i = 0; i < count; i++) {
    myWin[i] = 0;
    rivalWin[i] = 0;
  }
}

// 重置棋盘
function reset() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);
  initParams();
  drawChessBoard();
  textContainer.innerText = '游戏开始';
  over = false;
  me = true;
}

var about = document.getElementById('about');
var btnAbout = document.getElementById('btn-about');
btnAbout.onclick = function () {
  about.showModal();
};
about.onclick = function () {
  about.close();
};