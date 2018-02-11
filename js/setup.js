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
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARD_EYES_COLOR = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];
var WIZARD_FIREBALL_COLOR = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var fragment = document.createDocumentFragment();
var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var userNameInputElement = setupElement.querySelector('.setup-user-name');

// common functions
var getRandomNumber = function (max) {
  return Math.round(Math.random() * max);
};

var getRandomElement = function (arr) {
  return arr[getRandomNumber(arr.length - 1)];
};

// Popup
// handle click on ESC button while popup is open
var popUpEscHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
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

// set listener for mouse click on popup open element
setupOpenElement.addEventListener('click', function () {
  openPopup();
});

// set listener for key press on popup open element
setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

// set listener for mouse click on popup close element
setupCloseElement.addEventListener('click', function () {
  closePopup();
});

// set listener for key press on popup close element
setupCloseElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

// set listener for focus on username input
// prevent close popup when username input with focus
userNameInputElement.addEventListener('focusin', function () {
  document.removeEventListener('keydown', popUpEscHandler);
});

userNameInputElement.addEventListener('focusout', function () {
  document.addEventListener('keydown', popUpEscHandler);
});


// Main wizard properties
var mainWizardSetupElement = setupElement.querySelector('.setup-wizard');
var mainWizardCoatElement = mainWizardSetupElement.querySelector('.wizard-coat');
var mainWizardEyesElement = mainWizardSetupElement.querySelector('.wizard-eyes');
var mainWizardFireballElement = setupElement.querySelector('.setup-fireball-wrap');

// Change main wizard coat color by click
mainWizardCoatElement.addEventListener('click', function () {
  mainWizardCoatElement.style.fill = getRandomElement(WIZARD_COAT_COLOR);
});

// Change main wizard eyes color by click
mainWizardEyesElement.addEventListener('click', function () {
  mainWizardEyesElement.style.fill = getRandomElement(WIZARD_EYES_COLOR);
});

// Change main wizard fireball color by click
mainWizardFireballElement.addEventListener('click', function () {
  mainWizardFireballElement.style.backgroundColor = getRandomElement(WIZARD_FIREBALL_COLOR);
});

// Similar Wizards block
var similarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// specific functions

var similarWizardName = function () {
  return getRandomElement(WIZARD_NAMES) + ' ' + getRandomElement(WIZARD_LASTNAMES);
};

// generate data
var generateSimilarWizards = function (num) {
  var data = [];

  for (var i = 0; i < num; i++) {
    data.push({
      name: similarWizardName(),
      coatColor: getRandomElement(WIZARD_COAT_COLOR),
      eyesColor: getRandomElement(WIZARD_EYES_COLOR)
    });
  }
  return data;
};

var similarWizards = generateSimilarWizards(4);

// apply generated data to template
var renderSimilarWizard = function (similarWizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = similarWizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = similarWizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = similarWizard.eyesColor;

  return wizardElement;
};

// insert similar wizards to DOM element
var showSimilarWizards = function (data) {
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(renderSimilarWizard(data[i]));
  }
  similarList.appendChild(fragment);
};

showSimilarWizards(similarWizards);

setupElement.querySelector('.setup-similar').classList.remove('hidden');
