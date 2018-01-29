'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var LEGEND_GAP = 20;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return Math.round(maxElement);
};

var getRandomOpacity = function () {
  return 'rgba(0, 0, 255,' + Math.random() + ')';
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = 'PT Mono 16px';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 120, 30);
  ctx.fillText('Список результатов:', 120, 50);

  var maxTime = getMaxElement(times);
  var barWidth = 40;
  var columnGap = 50;
  var histogramHeight = 150;

  var drawBar = function (x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  };

  var drawBarLegend = function (text, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  };

  for (var i = 0; i < times.length; i++) {
    var barHeight = times[i] * (histogramHeight / maxTime);
    var barX = CLOUD_X + LEGEND_GAP + (barWidth + columnGap) * i;
    var barY = (CLOUD_HEIGHT - LEGEND_GAP) - barHeight;
    var barColor = getRandomOpacity();

    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    }

    // bars
    drawBar(barX, barY, barWidth, barHeight, barColor);

    // players
    drawBarLegend(names[i], barX, barY - LEGEND_GAP, '#000');

    // player times
    drawBarLegend(Math.round(times[i]), barX, barY + barHeight + CLOUD_GAP, '#000');

  }

};
