'use strict';

window.utils = (function () {

  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  return {
    getRandomNumber: function (max) {
      return Math.round(Math.random() * max);
    },
    getRandomElement: function (arr) {
      return arr[window.utils.getRandomNumber(arr.length - 1)];
    },
    shuffleCollection: function (arr) {
      var currentIndex = arr.length;
      var tempValue;
      var randomIndex;

      while (currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex--);

        tempValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = tempValue;
      }
      return arr;
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    colorize: function (element, colors) {
      element.addEventListener('click', function () {
        var color = window.utils.getRandomElement(colors);
        if (element.tagName.toLowerCase() === 'div') {
          element.style.backgroundColor = color;
        } else {
          element.style.fill = color;
        }
      });
    }
  };
})();
