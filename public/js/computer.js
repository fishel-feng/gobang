// ai算法
function computerAI() {
  var myScore = [];
  var computerScore = [];
  var max = 0;
  var u = 0, v = 0;
  var i = 0, j = 0, k = 0;
  for (i = 0; i < 15; i++) {
    myScore[i] = [];
    computerScore[i] = [];
    for (j = 0; j < 15; j++) {
      myScore[i][j] = 0;
      computerScore[i][j] = 0;
    }
  }
  for (i = 0; i < 15; i++) {
    for (j = 0; j < 15; j++) {
      if (chessBoard[i][j] === 0) {
        for (k = 0; k < count; k++) {
          if (wins[i][j][k]) {
            if (myWin[k] === 1) {
              myScore[i][j] += 200;
            } else if (myWin[k] === 2) {
              myScore[i][j] += 400;
            } else if (myWin[k] === 3) {
              myScore[i][j] += 2000;
            } else if (myWin[k] === 4) {
              myScore[i][j] += 10000;
            }
            if (rivalWin[k] === 1) {
              computerScore[i][j] += 220;
            } else if (rivalWin[k] === 2) {
              computerScore[i][j] += 420;
            } else if (rivalWin[k] === 3) {
              computerScore[i][j] += 2100;
            } else if (rivalWin[k] === 4) {
              computerScore[i][j] += 20000;
            }
          }
        }
        if (myScore[i][j] > max) {
          max = myScore[i][j];
          u = i;
          v = j;
        } else if (myScore[i][j] = max) {
          if (computerScore[i][j] > computerScore[u][v]) {
            u = i;
            v = j;
          }
        }
        if (computerScore[i][j] > max) {
          max = computerScore[i][j];
          u = i;
          v = j;
        } else if (computerScore[i][j] = max) {
          if (myScore[i][j] > myScore[u][v]) {
            u = i;
            v = j;
          }
        }
      }
    }
  }
  oneStep(u, v, false);
  chessBoard[u][v] = 2;
  for (k = 0; k < count; k++) {
    if (wins[u][v][k]) {
      rivalWin[k]++;
      myWin[k] = 6;
      if (rivalWin[k] === 5) {
        textContainer.innerText = '游戏结束';
        showDialog('你输了,再开一局？', function () {
          reset();
          me = true;
        });
        over = true;
      }
    }
  }
  if (!over) {
    me = !me;
  }
}