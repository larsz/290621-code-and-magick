'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var LEGEND_GAP = 20;
var BASE_FONT = 'PT Mono 16px';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, text, x, y, color, font) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var drawBar = function (ctx, x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
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

  renderText(ctx, 'Ура вы победили!', CLOUD_X + LEGEND_GAP, CLOUD_Y + LEGEND_GAP, '#000', BASE_FONT);
  renderText(ctx, 'Список результатов:', CLOUD_X + LEGEND_GAP, CLOUD_Y + LEGEND_GAP + LEGEND_GAP, '#000', BASE_FONT);

  var maxTime = getMaxElement(times);
  var barWidth = 40;
  var columnGap = 50;
  var histogramHeight = 150;

  for (var i = 0; i < times.length; i++) {
    var barHeight = times[i] * (histogramHeight / maxTime);
    var barX = CLOUD_X + LEGEND_GAP + (barWidth + columnGap) * i;
    var barY = (CLOUD_HEIGHT - LEGEND_GAP) - barHeight;
    var barColor = getRandomOpacity();

    if (names[i] === 'Вы') {
      barColor = 'rgba(255, 0, 0, 1)';
    }

    // bars
    drawBar(ctx, barX, barY, barWidth, barHeight, barColor);

    // players
    renderText(ctx, names[i], barX, barY - CLOUD_GAP, '#000');

    // player times
    renderText(ctx, Math.round(times[i]), barX, barY + barHeight + LEGEND_GAP, '#000');
  }

};
