'use strict';

(function () {

  var mainWizardSetupElement = document.querySelector('.setup-wizard');
  var mainWizardCoatElement = mainWizardSetupElement.querySelector('.wizard-coat');
  var mainWizardEyesElement = mainWizardSetupElement.querySelector('.wizard-eyes');
  var mainWizardFireballElement = document.querySelector('.setup-fireball-wrap');

  // Change color by click
  window.utils.colorize(mainWizardCoatElement, window.WizardConsts.COAT_COLOR);
  window.utils.colorize(mainWizardEyesElement, window.WizardConsts.EYES_COLOR);
  window.utils.colorize(mainWizardFireballElement, window.WizardConsts.FIREBALL_COLOR);

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var similarWizardsElement = document.querySelector('.setup-similar');
  var similarListElement = similarWizardsElement.querySelector('.setup-similar-list');

  // Apply wizards data to template
  var renderWizard = function (similarWizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = similarWizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = similarWizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = similarWizard.colorEyes;

    return wizardElement;
  };

  // insert similar wizards to DOM element
  var showSimilarWizards = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarListElement.appendChild(fragment);
    similarWizardsElement.classList.remove('hidden');
  };

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

  var succesLoadDataHandler = function (loadedData) {
    // Get random 4 wizards from loaded data
    var loadedWizards = window.utils.shuffleCollection(loadedData.slice(0));
    loadedWizards = loadedWizards.slice(0, window.WizardConsts.QUANTITY);

    showSimilarWizards(loadedWizards);
  };

  var succesFormHandler = function () {
    window.popup.closePopup();
  };

  var errorHandler = function (errorMessage) {
    var errorBox = document.createElement('div');
    errorBox.classList.add('error-message');

    errorBox.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorBox);
  };

  // submit form data
  var setupElement = document.querySelector('.setup');
  var setupForm = setupElement.querySelector('.setup-wizard-form');

  setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(setupForm);

    window.backend.save(formData, succesFormHandler, errorHandler);
  });

  // load wizards
  window.backend.load(succesLoadDataHandler, errorHandler);
})();
