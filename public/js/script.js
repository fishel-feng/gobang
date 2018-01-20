var canvasWidth = canvasHeight = Math.min(800, document.documentElement.clientWidth - 20);

var canvas = document.getElementById('chess');
var context = canvas.getContext('2d');
var computer = document.getElementById('computer');
var person = document.getElementById('person');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var over = false;
var i = 0, j = 0;
var chessBoard = [];
for (i = 0; i < 15; i++) {
  chessBoard[i] = [];
  for (j = 0; j < 15; j++) {
    chessBoard[i][j] = 0;
  }
}

var me = true;
context.strokeStyle = '#9f7a59';
context.lineWidth = 2;
var boxWidth = (canvasWidth - 10) / 15;
var radius = boxWidth / 2 * 0.8;
var realPadding = 5 + boxWidth / 2;
window.onload = function () {
  drawChessBoard();
};

function drawChessBoard() {
  for (var i = 0; i < 15; i++) {
    context.moveTo(realPadding + i * boxWidth, realPadding);
    context.lineTo(realPadding + i * boxWidth, canvasHeight - realPadding);
    context.stroke();
    context.moveTo(realPadding, realPadding + i * boxWidth);
    context.lineTo(canvasHeight - realPadding, realPadding + i * boxWidth);
    context.stroke();
  }
}

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
        computerWin[k] = 6;
        if (myWin[k] === 5) {
          window.alert('你赢了');
          over = true;
        }
      }
    }
    if (!over) {
      me = !me;
      computerAI();
    }
  }
};

computer.onclick = function (e) {
  console.log('c');
};

person.onclick = function (e) {
  personPlay();
};