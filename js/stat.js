'use strict';
// Функция отрисовки окна сообщения
function drawWindowMessage(ctx, arrayOfPoints) {
  var SHIFT_SHADOW = 10;
  var COLOR_SHADOW = 'rgba(0, 0, 0, 0.7)';
  var COLOR_WINDOW = '#fff';

  ctx.shadowColor = COLOR_SHADOW;
  ctx.shadowOffsetX = SHIFT_SHADOW;
  ctx.shadowOffsetY = SHIFT_SHADOW;
  ctx.fillStyle = COLOR_WINDOW;
  ctx.beginPath();
  // Цикл проходит по массиву объектов и на
  // каждой итераций проводит линию к координатам заданным в объекте
  // путём добавления координат можно нарисовать не только прямоугольник
  for (var i = 0; i < arrayOfPoints.length; i++) {
    ctx.lineTo(arrayOfPoints[i].x, arrayOfPoints[i].y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawMessage(ctx, times, names, POINTS, PADDING, LINE_HEIGHT) {
  var COLOR_TEXT = '#000';
  var FONT = '16px PT Mono';
  var min = times[0];
  var PLAYER = 'Вы';
  var winner;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.fillStyle = COLOR_TEXT;
  ctx.font = FONT;
  for (var i = 0; i < times.length; i++) {
    if (times[i] <= min) {
      min = times[i];
      winner = names[i];
    }
  }
  if ( winner === PLAYER) {
    ctx.fillText('Ура, ' + PLAYER + ' победили!', POINTS[0].x + PADDING, POINTS[0].y + PADDING);
  } else {
    ctx.fillText('Ура, игрок ' + winner + ' победил!', POINTS[0].x + PADDING, POINTS[0].y + PADDING);
  }
  ctx.fillText('Список результатов:', POINTS[0].x + PADDING, POINTS[0].y + PADDING + LINE_HEIGHT);
  return winner;
}

function calculationMaxTime(times) {
  var max = -1;
  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }
  return max;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function paintigColumn(ctx, name) {
  var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';
  var columnColor;
  var otherPlayerColor = 'rgba(0, 0, 255, ' + getRandomNumber(0.1, 1) + ')';
  if (name === 'Вы') {
    columnColor = PLAYER_COLOR;
  } else {
    columnColor = otherPlayerColor;
  }
  return columnColor;
}

function drawColumn(ctx, POINTS, LINE_HEIGHT, max, times, names, padding) {
  var HISTO_HEIGHT = 150;
  var COLUMN_WIDTH = 40;
  var COLUMN_INDENT = 50;
  var columnX = POINTS[0].x + padding;
  var columnY = 250;
  var STEP = HISTO_HEIGHT / max;
  for (var i = 0; i < times.length; i++) {
    var playerTime = times[i];
    var height = -STEP * playerTime;
    ctx.fillStyle = paintigColumn(ctx, names[i]);
    // Отрисовка колонок: columnX - стартовая точка отрисовки колонки
    // сумму отступа между колонками и ширину колонок умножаем на индекс элемента массива
    // к результату прибавляем стартовую точку
    ctx.fillRect(columnX + (COLUMN_INDENT + COLUMN_WIDTH) * i, columnY, COLUMN_WIDTH, height);
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], columnX + (COLUMN_INDENT + COLUMN_WIDTH) * i, columnY + LINE_HEIGHT, COLUMN_WIDTH);
    ctx.fillText(parseInt(playerTime, 10), columnX + (COLUMN_INDENT + COLUMN_WIDTH) * i, columnY - 10 - -height, COLUMN_WIDTH);
  }
}

window.renderStatistics = function (ctx, names, times) {
  var POINTS = [{x: 100, y: 10}, {x: 520, y: 10}, {x: 520, y: 280}, {x: 100, y: 280}];
  var PADDING = 30;
  var LINE_HEIGHT = 20;
  drawWindowMessage(ctx, POINTS);
  drawMessage(ctx, times, names, POINTS, PADDING, LINE_HEIGHT);
  drawColumn(ctx, POINTS, LINE_HEIGHT, calculationMaxTime(times), times, names, PADDING);
};

