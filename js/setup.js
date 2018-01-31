'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

//var WIZARD_NAMES = ['Дамблдор', 'Волдеморт', 'Доктор Стрендж', 'Гарри Поттер'];

var setupDialog = document.querySelector('.setup');
setupDialog.classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var generateRandom = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var wizardName = function () {
  var name = generateRandom(WIZARD_NAMES) + ' ' + generateRandom(WIZARD_SURNAMES);
  return name;
};

var wizards = [
  {
    name: wizardName(),
    coatColor: 'rgb(241, 43, 107)'
  },
  {
    name: wizardName(),
    coatColor: 'rgb(215, 210, 55)'
  },
  {
    name: wizardName(),
    coatColor: 'rgb(101, 137, 164)'
  },
  {
    name: wizardName(),
    coatColor: 'rgb(127, 127, 127)'
  }
];


var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizardElement.coatColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
};

similarList.appendChild(fragment);
setupDialog.querySelector('.setup-similar').classList.remove('hidden');
