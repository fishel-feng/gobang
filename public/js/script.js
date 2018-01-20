var canvasWidth = canvasHeight = Math.min(800, document.documentElement.clientWidth - 20);

var canvas = document.getElementById("chess");
var context = chess.getContext("2d");

canvas.width = canvasWidth;
canvas.height = canvasHeight;


// var over = false;
// var wins = [];
// var myWin = [];
// var computerWin = [];
// var count = 0;
//
//
// for (i = 0; i < 15; i++) {
//   wins[i] = [];
//   for (j = 0; j < 15; j++) {
//     wins[i][j] = [];
//   }
// }
//
// for (i = 0; i < 15; i++) {
//   for (j = 0; j < 11; j++) {
//     for (k = 0; k < 5; k++) {
//       wins[i][j + k][count] = true;
//     }
//     count++;
//   }
// }
//
// for (i = 0; i < 15; i++) {
//   for (j = 0; j < 11; j++) {
//     for (k = 0; k < 5; k++) {
//       wins[j + k][i][count] = true;
//     }
//     count++;
//   }
// }
//
// for (i = 0; i < 11; i++) {
//   for (j = 0; j < 11; j++) {
//     for (k = 0; k < 5; k++) {
//       wins[i + k][j + k][count] = true;
//     }
//     count++;
//   }
// }
//
// for (i = 0; i < 11; i++) {
//   for (j = 14; j > 3; j--) {
//     for (k = 0; k < 5; k++) {
//       wins[i + k][j - k][count] = true;
//     }
//     count++;
//   }
// }
//
// for (i = 0; i < count; i++) {
//   myWin[i] = 0;
//   computerWin[i] = 0;
// }


// function computerAI() {
//   var myScore = [];
//   var computerScore = [];
//   var max = 0;
//   var u = 0, v = 0;
//   var i = 0, j = 0, k = 0;
//   for (i = 0; i < 15; i++) {
//     myScore[i] = [];
//     computerScore[i] = [];
//     for (j = 0; j < 15; j++) {
//       myScore[i][j] = 0;
//       computerScore[i][j] = 0;
//     }
//   }
//   for (i = 0; i < 15; i++) {
//     for (j = 0; j < 15; j++) {
//       if (chessBoard[i][j] === 0) {
//         for (k = 0; k < count; k++) {
//           if (wins[i][j][k]) {
//             if (myWin[k] === 1) {
//               myScore[i][j] += 200;
//             } else if (myWin[k] === 2) {
//               myScore[i][j] += 400;
//             } else if (myWin[k] === 3) {
//               myScore[i][j] += 2000;
//             } else if (myWin[k] === 4) {
//               myScore[i][j] += 10000;
//             }
//             if (computerWin[k] === 1) {
//               computerScore[i][j] += 220;
//             } else if (computerWin[k] === 2) {
//               computerScore[i][j] += 420;
//             } else if (computerWin[k] === 3) {
//               computerScore[i][j] += 2100;
//             } else if (computerWin[k] === 4) {
//               computerScore[i][j] += 20000;
//             }
//           }
//         }
//         if (myScore[i][j] > max) {
//           max = myScore[i][j];
//           u = i;
//           v = j;
//         } else if (myScore[i][j] = max) {
//           if (computerScore[i][j] > computerScore[u][v]) {
//             u = i;
//             v = j;
//           }
//         }
//         if (computerScore[i][j] > max) {
//           max = computerScore[i][j];
//           u = i;
//           v = j;
//         } else if (computerScore[i][j] = max) {
//           if (myScore[i][j] > myScore[u][v]) {
//             u = i;
//             v = j;
//           }
//         }
//       }
//     }
//   }
//   oneStep(u, v, false);
//   chessBoard[u][v] = 2;
//   for (k = 0; k < count; k++) {
//     if (wins[u][v][k]) {
//       computerWin[k]++;
//       myWin[k] = 6;
//       if (computerWin[k] === 5) {
//         window.alert("你输了");
//         over = true;
//       }
//     }
//   }
//   if (!over) {
//     me = !me;
//   }
// }

var i = 0, j = 0, k = 0;
var chessBoard = [];
for (i = 0; i < 15; i++) {
  chessBoard[i] = [];
  for (j = 0; j < 15; j++) {
    chessBoard[i][j] = 0;
  }
}
var me = true;
context.strokeStyle = "#9f7a59";
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
    gradient.addColorStop(0, "#0a0a0a");
    gradient.addColorStop(1, "#636766");
  } else {
    gradient.addColorStop(0, "#9d9d9d");
    gradient.addColorStop(1, "#f9f9f9");
  }
  context.fillStyle = gradient;
  context.fill();
}

canvas.onclick = function (e) {
  // if (over) {
  //   return;
  // }
  // if (!me) {
  //   return;
  // }
  var x = e.offsetX;
  var y = e.offsetY;
  var i = Math.floor(x / boxWidth);
  var j = Math.floor(y / boxWidth);
  if (i > 14 || j > 14) {
    return
  }
  if (chessBoard[i][j] === 0) {
    oneStep(i, j, me);
    if(me){
      chessBoard[i][j] = 1;
    }else {
      chessBoard[i][j] = 2;
    }
    //   chessBoard[i][j] = 1;
    //   for (var k = 0; k < count; k++) {
    //     if (wins[i][j][k]) {
    //       myWin[k]++;
    //       computerWin[k] = 6;
    //       if (myWin[k] === 5) {
    //         window.alert("你赢了");
    //         over = true;
    //       }
    //     }
    //   }
    //   if (!over) {
    me = !me;
    //     computerAI();
    //   }
  }
};
