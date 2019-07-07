(function () {

  var COUNT_OF_WIZARDS = 4;

  var getSomeElementsWithoutRepeat = function (array, number) {
    var copy = array.slice();
    for (var j = copy.length - 1; j >= number; j--) {
      copy.splice(Math.floor(Math.random() * copy.length), 1);
    }
    return copy;
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

  var createFragment = function (wizards) {
    var someWizards = getSomeElementsWithoutRepeat(wizards, COUNT_OF_WIZARDS);

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < COUNT_OF_WIZARDS; i++) {
      fragment.appendChild(renderWizard(someWizards[i]));
    }
    similarListElement.appendChild(fragment);
  }

  window.render = {
    createFragment: createFragment
  }

})();
