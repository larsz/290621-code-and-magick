'use strict';

(function () {
  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var userNameInputElement = setupElement.querySelector('.setup-user-name');

  // set listener for mouse click on popup open element
  setupOpenElement.addEventListener('click', function () {
    openPopup();
  });

  // set listener for key press on popup open element
  setupOpenElement.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, openPopup);
  });

  // set listener for mouse click on popup close element
  setupCloseElement.addEventListener('click', function () {
    closePopup();
  });

  // set listener for key press on popup close element
  setupCloseElement.addEventListener('keydown', function (evt) {
    window.utils.isEnterEvent(evt, closePopup);
  });

  // prevent close popup when username input with focus
  userNameInputElement.addEventListener('focusin', function () {
    document.removeEventListener('keydown', popUpEscHandler);
  });

  userNameInputElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', popUpEscHandler);
  });

  // handle click on ESC button while popup is open
  var popUpEscHandler = function (evt) {
    window.utils.isEscEvent(evt, closePopup);
  };

  // open popup function for event listener
  var openPopup = function () {
    setupElement.classList.remove('hidden');
    document.addEventListener('keydown', popUpEscHandler);
  };

  // close popup function for event listener
  var closePopup = function () {
    setupElement.classList.add('hidden');
    document.removeEventListener('keydown', popUpEscHandler);
  };

})();
