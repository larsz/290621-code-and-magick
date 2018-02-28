'use strict';

(function () {

  var createMessage = function (classname, text) {
    var message = document.createElement('div');
    message.classList.add('notification');
    message.classList.add(classname);

    message.textContent = text;

    message.addEventListener('click', function (evt) {
      evt.target.remove();
    });

    document.body.insertAdjacentElement('afterbegin', message);
  };

  var throwError = function (errorMessage) {
    createMessage('error', errorMessage);
  };

  var showMessage = function () {
    createMessage('success', 'Форма отправлена успешно!');
  };

  window.notification = {
    showError: throwError,
    showInfo: showMessage,
  };
})();
