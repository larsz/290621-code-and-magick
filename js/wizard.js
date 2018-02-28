'use strict';

(function () {
  var mainWizardSetupElement = document.querySelector('.setup-wizard');
  var coatColor;
  var eyesColor;
  var loadedWizards = [];

  var mainWizardCoatElement = mainWizardSetupElement.querySelector('.wizard-coat');
  mainWizardCoatElement.addEventListener('click', function (evt) {
    var newColor = window.utils.getRandomElement(window.WizardConsts.COAT_COLOR);
    evt.target.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });

  var mainWizardEyesElement = mainWizardSetupElement.querySelector('.wizard-eyes');
  mainWizardEyesElement.addEventListener('click', function (evt) {
    var newColor = window.utils.getRandomElement(window.WizardConsts.EYES_COLOR);
    evt.target.style.fill = newColor;
    wizard.onEyesChange(newColor);
  });

  var mainWizardFireballElement = document.querySelector('.setup-fireball-wrap');
  mainWizardFireballElement.addEventListener('click', function (evt) {
    var newColor = window.utils.getRandomElement(window.WizardConsts.FIREBALL_COLOR);
    evt.target.style.backgroundColor = newColor;
  });

  var wizard = {
    onEyesChange: function (color) {
      eyesColor = color;
      window.debounce(updateWizards);
    },
    onCoatChange: function (color) {
      coatColor = color;
      window.debounce(updateWizards);
    }
  };

  var getRank = function (person) {
    var rank = 0;
    if (person.colorCoat === coatColor) {
      rank += 2;
    }
    if (person.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render.showSimilarWizards(loadedWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var succesLoadDataHandler = function (loadedData) {
    // Get random 4 wizards from loaded data
    loadedWizards = loadedData;
    updateWizards();
  };

  // load wizards
  window.backend.load(succesLoadDataHandler, window.notification.showError);

})();
