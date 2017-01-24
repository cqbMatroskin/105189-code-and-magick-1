'use strict';

window.renderStatistics = function (ctx, names, times) {
  var shiftShadow = 10;
  var PADDING = 30;
  var LINE_HEIGHT = 20;
  var max = -1;
  var POINTS = [{x: 100, y: 10}, {x: 520, y: 10}, {x: 520, y: 280}, {x: 100, y: 280}];
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.beginPath();
  for (var i = 0; i < POINTS.length; i++) {
    ctx.lineTo(POINTS[i].x + shiftShadow, POINTS[i].y + shiftShadow);
  }
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(POINTS[0].x, POINTS[0].y);
  for (var index = 1; index < POINTS.length; index++) {
    ctx.lineTo(POINTS[index].x, POINTS[index].y);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.fill();

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура, вы победили!', POINTS[0].x + PADDING, POINTS[0].y + PADDING);
  ctx.fillText('Список результатов:', POINTS[0].x + PADDING, POINTS[0].y + PADDING + LINE_HEIGHT);

  for (var t = 0; t < times.length; t++ ) {
    var time = times[t];
    if (time > max) {
      max = time;
    }
  }
  var HISTO_HEIGHT = 150;
  var COLUMN_WIDTH = 40;
  var COLUMN_INDENT = 50;
  var columnX = POINTS[0].x + PADDING;
  var columnY = 250;
  var step = HISTO_HEIGHT / max;
  var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
  var otherPlayerColor = 'rgba(0, 0, 255, ' + Math.random() * (1 - 0.1) + 0.1 + ')';
  // var otherPlayerColor = 'rgba(255, 0, 0, 0.5)';
  ctx.fillStyle = otherPlayerColor;
  for (var h = 0; h < times.length; h++) {
    var name = names[h];
    var playerTime = times[h];
    var height = -(step * playerTime);
    if (name === 'Вы') {
      ctx.fillStyle = PLAYER_COLOR;
    }
    ctx.fillStyle = otherPlayerColor;
    console.info(otherPlayerColor);
    ctx.fillRect(columnX + (COLUMN_INDENT + COLUMN_WIDTH) * h, columnY, COLUMN_WIDTH, height);
    ctx.fillText(name, columnX + (COLUMN_INDENT + COLUMN_WIDTH) * h, columnY + LINE_HEIGHT, COLUMN_WIDTH);
    ctx.fillText(parseInt(playerTime, 10), columnX + (COLUMN_INDENT + COLUMN_WIDTH) * h, columnY - 10 - -height, COLUMN_WIDTH);
  }
};

