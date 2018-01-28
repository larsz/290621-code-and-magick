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
  var barX = 120;
  var histogramHeight = 150;

  for (var i = 0; i < times.length; i++) {
    var barHeight = times[i] * (histogramHeight / maxTime);
    var barY = (CLOUD_HEIGHT - LEGEND_GAP) - barHeight;

    ctx.fillStyle = 'rgba(0, 0, 255,' + Math.random() + ')';

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    }

    // диаграммы
    ctx.fillRect(barX + (barWidth + columnGap) * i, barY, barWidth, barHeight);

    // имена
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], barX + (barWidth + columnGap) * i, barY - LEGEND_GAP);

    // времена
    ctx.fillText(Math.round(times[i]), barX + (barWidth + columnGap) * i, barY + barHeight + CLOUD_GAP);

  }

};
