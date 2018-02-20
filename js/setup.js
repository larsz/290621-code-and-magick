'use strict';

(function () {

  var mainWizardSetupElement = document.querySelector('.setup-wizard');
  var mainWizardCoatElement = mainWizardSetupElement.querySelector('.wizard-coat');
  var mainWizardEyesElement = mainWizardSetupElement.querySelector('.wizard-eyes');
  var mainWizardFireballElement = document.querySelector('.setup-fireball-wrap');
  var similarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

  // Change color by click
  window.utils.colorize(mainWizardCoatElement, window.WizardConsts.COAT_COLOR);
  window.utils.colorize(mainWizardEyesElement, window.WizardConsts.EYES_COLOR);
  window.utils.colorize(mainWizardFireballElement, window.WizardConsts.FIREBALL_COLOR);

  // Similar Wizards
  var getWizardName = function () {
    return window.utils.getRandomElement(window.WizardConsts.NAMES) + ' ' + window.utils.getRandomElement(window.WizardConsts.LAST_NAMES);
  };

  // Generate Wizard
  var generateWizards = function (num) {
    var data = [];

    for (var i = 0; i < num; i++) {
      data.push({
        name: getWizardName(),
        coatColor: window.utils.getRandomElement(window.WizardConsts.COAT_COLOR),
        eyesColor: window.utils.getRandomElement(window.WizardConsts.EYES_COLOR)
      });
    }
    return data;
  };

  var generatedWizards = generateWizards(window.WizardConsts.QUANTITY);

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
