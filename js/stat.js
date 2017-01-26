'use strict';

var colors = {
  BLACK: '#000',
  RED: '#f00',
  WHITE: '#fff',
  BLACK_ALFA: 'rgba(0, 0, 0, 0.7)'
};
var POINTS = [{x: 100, y: 10}, {x: 520, y: 10}, {x: 520, y: 280}, {x: 100, y: 280}];
var COLOR_SHADOW = colors.BLACK_ALFA;
var COLOR_WINDOW = colors.WHITE;
var COLOR_TEXT = colors.BLACK;
var PLAYER_COLOR = colors.RED;
var PLAYER = 'Вы';
var FONT = '16px PT Mono';
var SHIFT_SHADOW = 10;
var HISTO_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var COLUMN_INDENT = 50;
var PADDING = 30;
var LINE_HEIGHT = 20;

// Функция отрисовки окна сообщения
function drawWindowMessage(ctx, arrayOfPoints) {
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
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
}

function getWinner(times, names) {
  var min = times[0];
  var winner;
  for (var i = 0; i < times.length; i++) {
    if (times[i] <= min) {
      min = times[i];
      winner = names[i];
    }
  }
  return winner;
}

function drawMessage(ctx, times, names, arrayOfPoints, padding, lineHeight) {
  var winner = getWinner(times, names);
  var winnerMessage = winner === PLAYER ? 'Ура, ' + PLAYER + ' победили!' : 'Ура, игрок ' + winner + ' победил!';
  ctx.fillStyle = COLOR_TEXT;
  ctx.font = FONT;
  ctx.fillText(winnerMessage, arrayOfPoints[0].x + padding, arrayOfPoints[0].y + padding);
  ctx.fillText('Список результатов:', arrayOfPoints[0].x + padding, arrayOfPoints[0].y + padding + lineHeight);
}
// Функция возвращает максимальный элемент массива
function calculationMaxTime(times) {
  return Math.max.apply(null, times);
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function paintColumns(name) {
  var otherPlayerColor = 'rgba(0, 0, 255, ' + getRandomNumber(0.1, 1) + ')';
  return (name === PLAYER) ? PLAYER_COLOR : otherPlayerColor;
}

function drawColumns(ctx, arrayOfPoints, lineHeight, max, times, names, padding) {
  var columnX = arrayOfPoints[0].x + padding;
  var columnY = 250;
  var step = HISTO_HEIGHT / max;
  for (var i = 0; i < times.length; i++) {
    var playerTime = times[i];
    var height = -step * playerTime;
    ctx.fillStyle = paintColumns(names[i]);
    // Отрисовка колонок: columnX - стартовая точка отрисовки колонки
    // сумму отступа между колонками и ширину колонок умножаем на индекс элемента массива
    // к результату прибавляем стартовую точку
    ctx.fillRect(columnX + (COLUMN_INDENT + COLUMN_WIDTH) * i, columnY, COLUMN_WIDTH, height);
    ctx.fillStyle = colors.BLACK;
    ctx.fillText(names[i], columnX + (COLUMN_INDENT + COLUMN_WIDTH) * i, columnY + lineHeight, COLUMN_WIDTH);
    ctx.fillText(parseInt(playerTime, 10), columnX + (COLUMN_INDENT + COLUMN_WIDTH) * i, columnY - 10 - -height, COLUMN_WIDTH);
  }
}

window.renderStatistics = function (ctx, names, times) {
  drawWindowMessage(ctx, POINTS);
  drawMessage(ctx, times, names, POINTS, PADDING, LINE_HEIGHT);
  drawColumns(ctx, POINTS, LINE_HEIGHT, calculationMaxTime(times), times, names, PADDING);
};
