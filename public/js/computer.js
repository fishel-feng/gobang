var i = 0, j = 0, k = 0;
// 赢法数组
var wins = [];
// 赢法数量
var count = 0;
// 人的赢法统计数组
var myWin = [];
// ai的赢法统计数组
var computerWin = [];

// 初始化赢法数组
for (i = 0; i < 15; i++) {
  wins[i] = [];
  for (j = 0; j < 15; j++) {
    wins[i][j] = [];
  }
}


// 遍历横，纵，正对角线，反对角线四种赢法
for (i = 0; i < 15; i++) {
  for (j = 0; j < 11; j++) {
    for (k = 0; k < 5; k++) {
      wins[i][j + k][count] = true;
    }
    count++;
  }
}

for (i = 0; i < 15; i++) {
  for (j = 0; j < 11; j++) {
    for (k = 0; k < 5; k++) {
      wins[j + k][i][count] = true;
    }
    count++;
  }
}

for (i = 0; i < 11; i++) {
  for (j = 0; j < 11; j++) {
    for (k = 0; k < 5; k++) {
      wins[i + k][j + k][count] = true;
    }
    count++;
  }
}

for (i = 0; i < 11; i++) {
  for (j = 14; j > 3; j--) {
    for (k = 0; k < 5; k++) {
      wins[i + k][j - k][count] = true;
    }
    count++;
  }
}

// 初始化赢法统计数组
for (i = 0; i < count; i++) {
  myWin[i] = 0;
  computerWin[i] = 0;
}

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
            if (computerWin[k] === 1) {
              computerScore[i][j] += 220;
            } else if (computerWin[k] === 2) {
              computerScore[i][j] += 420;
            } else if (computerWin[k] === 3) {
              computerScore[i][j] += 2100;
            } else if (computerWin[k] === 4) {
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
      computerWin[k]++;
      myWin[k] = 6;
      if (computerWin[k] === 5) {
        window.alert("你输了");
        over = true;
      }
    }
  }
  if (!over) {
    me = !me;
  }
}