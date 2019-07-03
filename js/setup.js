'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var COUNT_OF_WIZARDS = 4;

  var similarWizards = document.querySelector('.setup-similar');
  similarWizards.classList.remove('hidden');

  var getSomeElementsWithoutRepeat = function (array, number) {
    var copy = array.slice();
    for (var j = copy.length - 1; j >= number; j--) {
      copy.splice(Math.floor(Math.random() * copy.length), 1);
    }
    return copy;
  };

  var getRandomArrayElement = function (arr) {
    var randomElement = Math.floor(Math.random() * arr.length);
    return arr[randomElement];
  };

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizards) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizards.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizards.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizards.colorEyes;

    return wizardElement;
  };

  var onSuccess = function (wizards) {
    var someWizards = getSomeElementsWithoutRepeat(wizards, COUNT_OF_WIZARDS);

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_OF_WIZARDS; i++) {
      fragment.appendChild(renderWizard(someWizards[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open-icon');
  var setupClose = setup.querySelector('.setup-close');
  var setupWizardAppearance = setup.querySelector('.setup-wizard-appearance');
  var setupWizardCoat = setup.querySelector('.wizard-coat');
  var setupWizardEyes = setup.querySelector('.wizard-eyes');
  var setupWizardFireball = setup.querySelector('.setup-fireball-wrap');

  var onPopupEscPress = function (evt) {
    if (window.util.isEscPressed(evt)) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    if (!similarListElement.children[0]) {
      window.backend.load(onSuccess, onError);
    }
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (window.util.isEnterPressed(evt)) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (window.util.isEnterPressed(evt)) {
      closePopup();
    }
  });

  setupWizardCoat.addEventListener('click', function () {
    var randomCoatColor = getRandomArrayElement(COAT_COLORS);
    setupWizardCoat.style.fill = randomCoatColor;
    setupWizardAppearance.querySelector('input[name="coat-color"]').value = randomCoatColor;
  });

  setupWizardEyes.addEventListener('click', function () {
    var randomEyesColor = getRandomArrayElement(EYES_COLORS);
    setupWizardEyes.style.fill = randomEyesColor;
    setupWizardAppearance.querySelector('input[name="eyes-color"]').value = randomEyesColor;
  });

  setupWizardFireball.addEventListener('click', function () {
    var randomFireballColor = getRandomArrayElement(FIREBALL_COLORS);
    setupWizardFireball.style.backgroundColor = randomFireballColor;
    setupWizardFireball.querySelector('input').value = randomFireballColor;
  });

  window.setup = {
    onError: onError
  };
})();
