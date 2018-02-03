'use strict';

var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var WIZARD_LASTNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var WIZARD_COAT_COLOR = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)', 'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var setupDialog = document.querySelector('.setup');
setupDialog.classList.remove('hidden');

var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

var getRandomNumber = function (max) {
  return Math.round(Math.random() * max);
};

var getRandomElement = function (arr) {
  return arr[getRandomNumber(arr.length - 1)];
};

var wizardName = function () {
  return getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_LASTNAMES);
};

var wizards = [];
var wizardCount = 4;

for (var i = 0; i < wizardCount; i++) {
  wizards.push({
    name: wizardName(),
    coatColor: getRandomElement(WIZARD_COAT_COLOR),
    eyesColor: getRandomElement(WIZARD_EYES_COLOR)
  });
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

similarList.appendChild(fragment);
setupDialog.querySelector('.setup-similar').classList.remove('hidden');
