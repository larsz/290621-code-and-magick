'use strict';

(function () {

  var mainWizardSetupElement = document.querySelector('.setup-wizard');
  var mainWizardCoatElement = mainWizardSetupElement.querySelector('.wizard-coat');
  var mainWizardEyesElement = mainWizardSetupElement.querySelector('.wizard-eyes');
  var mainWizardFireballElement = document.querySelector('.setup-fireball-wrap');
  var similarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // Change color by click
  window.colorize(mainWizardCoatElement, window.wizardConsts.coatColor);
  window.colorize(mainWizardEyesElement, window.wizardConsts.eyesColor);
  window.colorize(mainWizardFireballElement, window.wizardConsts.fireballColor);

  // Similar Wizards
  var getWizardName = function () {
    return window.utils.getRandomElement(window.wizardConsts.names) + ' ' + window.utils.getRandomElement(window.wizardConsts.lastnames);
  };

  // Generate Wizard
  var generateWizards = function (num) {
    var data = [];

    for (var i = 0; i < num; i++) {
      data.push({
        name: getWizardName(),
        coatColor: window.utils.getRandomElement(window.wizardConsts.coatColor),
        eyesColor: window.utils.getRandomElement(window.wizardConsts.eyesColor)
      });
    }
    return data;
  };

  var generatedWizards = generateWizards(window.wizardConsts.count);

  // Apply generated data to template
  var renderWizard = function (similarWizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = similarWizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = similarWizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = similarWizard.eyesColor;

    return wizardElement;
  };

  // insert similar wizards to DOM element
  var fragment = document.createDocumentFragment();
  var showSimilarWizards = function (data) {
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarList.appendChild(fragment);
  };

  showSimilarWizards(generatedWizards);

  document.querySelector('.setup-similar').classList.remove('hidden');
})();
