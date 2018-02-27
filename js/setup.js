'use strict';

(function () {

  // popup drag
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var artifactsElement = document.querySelector('.setup-artifacts');
  var artifactCellElement = artifactsElement.querySelectorAll('.setup-artifacts-cell');
  var draggedItem = null;

  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }

    artifactCellElement.forEach(function (cell) {
      cell.style.outline = '2px dashed red';
    });
  });

  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });

  artifactsElement.addEventListener('dragstart', function () {
    artifactCellElement.forEach(function (cell) {
      cell.style.outline = '2px dashed red';
    });
  });

  artifactsElement.addEventListener('drop', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';

    if (evt.target.tagName.toLowerCase() === 'div') {
      evt.target.appendChild(draggedItem);
    }

    artifactCellElement.forEach(function (cell) {
      cell.style.outline = '';
    });
  });

  artifactsElement.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() === 'div') {
      evt.target.style.backgroundColor = 'yellow';
    }
  });

  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
    evt.target.style.backgroundColor = '';
  });

  document.addEventListener('dragend', function (evt) {
    evt.preventDefault();

    artifactCellElement.forEach(function (cell) {
      cell.style.backgroundColor = '';
    });

  });

  var succesFormHandler = function () {
    window.notification.showInfo();
    window.popup.closePopup();
  };

  // submit form data
  var setupElement = document.querySelector('.setup');
  var setupForm = setupElement.querySelector('.setup-wizard-form');

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(setupForm);

    window.backend.save(formData, succesFormHandler, window.notification.showError);
  });

})();
