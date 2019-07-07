'use strict';

(function () {

  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

  var similarWizards = document.querySelector('.setup-similar');
  similarWizards.classList.remove('hidden');
  var similarListElement = document.querySelector('.setup-similar-list');

  var getRandomArrayElement = function (arr) {
    var randomElement = Math.floor(Math.random() * arr.length);
    return arr[randomElement];
  };

  var wizards = [];
  var coatColor;
  var eyesColor;

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === eyesColor) {
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
    window.render.createFragment(wizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }));
  };

  var onEyesChange = function (color) {
    eyesColor = color;
    window.debounce(updateWizards);
  };

  var onCoatChange = function (color) {
    coatColor = color;
    window.debounce(updateWizards);
  };

  var onSuccess = function (data) {
    wizards = data;
    updateWizards();
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
    onCoatChange(randomCoatColor);
  });

  setupWizardEyes.addEventListener('click', function () {
    var randomEyesColor = getRandomArrayElement(EYES_COLORS);
    setupWizardEyes.style.fill = randomEyesColor;
    setupWizardAppearance.querySelector('input[name="eyes-color"]').value = randomEyesColor;
    onEyesChange(randomEyesColor);
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
