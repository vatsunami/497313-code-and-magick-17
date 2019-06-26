'use strict';

(function () {

  window.util = {
    KEYCODE_ESC: 27,
    KEYCODE_ENTER: 13,

    getSomeElementsWithoutRepeat: function (array, number) {
      var copy = array.slice();
      for (var j = copy.length - 1; j >= number; j--) {
        copy.splice(Math.floor(Math.random() * copy.length), 1);
      }
      return copy;
    },

    getRandomArrayElement: function (arr) {
      var randomElement = Math.floor(Math.random() * arr.length);
      return arr[randomElement];
    },

    getMaxArrayElement: function (arr) {
      var maxElement = arr[0];

      for (var i = 0; i < arr.length; i++) {
        if (arr[i] > maxElement) {
          maxElement = arr[i];
        }
      }
      return maxElement;
    },

    getRandomNumber: function (min, max) {
      return Math.random() * (max - min) + min;
    }
  };

})();
