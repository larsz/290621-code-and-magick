'use strict';

(function () {

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
    var takeNumber = data.length > window.WizardConsts.QUANTITY ? window.WizardConsts.QUANTITY : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarListElement.appendChild(fragment);
    similarWizardsElement.classList.remove('hidden');
  };

  window.render = {
    showSimilarWizards: showSimilarWizards
  };
})();
