'use strict';

(function () {
  window.colorize = function (element, colors) {
    element.addEventListener('click', function () {
      var color = window.utils.getRandomElement(colors);
      if (element.tagName.toLowerCase() === 'div') {
        element.style.backgroundColor = color;
      } else {
        element.style.fill = color;
      }
    });
  };
})();
