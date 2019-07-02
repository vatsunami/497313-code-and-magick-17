'use strict';

(function () {

  var setupDialogElement = document.querySelector('.setup');
  var dialogHandle = setupDialogElement.querySelector('.upload');
  var dialogOpen = document.querySelector('.setup-open-icon');

  var setupForm = document.querySelector('.setup-wizard-form');
  var setupButtonSubmit = setupForm.querySelector('.setup-submit');

  var onSuccess = function () {
    setupDialogElement.classList.add('hidden');
    setupButtonSubmit.disable = false;
  };

  var onSetupFormSubmit = function (evt) {
    evt.preventDefault();
    setupButtonSubmit.disable = true;
    window.backend.save(new FormData(setupForm), onSuccess, window.setup.onError);
  };

  setupForm.addEventListener('submit', onSetupFormSubmit);

  var returnToStartCoords = function () {
    setupDialogElement.style = '';
  };

  dialogOpen.addEventListener('click', function () {
    returnToStartCoords();
  });

  dialogHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
