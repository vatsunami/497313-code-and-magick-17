'use strict';

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var COUNT_OF_WIZARDS = 4;

var showBlock = function (selector) {
  document.querySelector(selector).classList.remove('hidden');
};

showBlock('.setup');
showBlock('.setup-similar');

var randomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
};

var createRandomWizards = function (name, surname, coatColor, eyesColor) {
  var randomWizards = [];
  for (var i = 0; i < name.length; i++) {
    randomWizards[i] = {
      name: name[i],
      surname: surname[i],
      coatColor: coatColor[randomInteger(0, coatColor.length - 1)],
      eyesColor: eyesColor[randomInteger(0, eyesColor.length - 1)]
    };
  }
  return randomWizards;
};

var getSomeElementsWithoutRepeat = function (array, number) {
  var copy = array.slice();
  for (var j = copy.length - 1; j >= number; j--) {
    copy.splice(Math.floor(Math.random() * copy.length), 1);
  }
  return copy;
};

var someWizards = getSomeElementsWithoutRepeat(createRandomWizards(NAMES, SURNAMES, COAT_COLORS, EYES_COLORS), COUNT_OF_WIZARDS);
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizards) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizards.name + ' ' + wizards.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < 4; i++) {
  fragment.appendChild(renderWizard(someWizards[i]));
}
similarListElement.appendChild(fragment);
