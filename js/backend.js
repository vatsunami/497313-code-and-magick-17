'use strict';

(function () {

  var URL_GET = 'https://js.dump.academy/code-and-magick/data';
  var URL_POST = 'https://js.dump.academy/code-and-magick';
  var TIMEOUT = 10000;
  var METHOD_GET = 'GET';
  var METHOD_POST = 'POST';

  var getErrorMessage = function (errorStatus) {
    switch (errorStatus) {
      case 301:
        return 'Ресурс переехал навсегда';
      case 307:
        return 'Ресурс переехал временно';
      case 400:
        return 'Неправильный запрос';
      case 404:
        return 'Запрашиваемый ресурс не найден';
      case 500:
        return 'Oшибка сервера';
      default:
        return 'Неизвестная ошибка, поробуйте позже';
    }
  };

  var createXhr = function (method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(getErrorMessage(xhr.status));
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);

    if (method === METHOD_GET) {
      xhr.send();
    }

    if (method === METHOD_POST && data) {
      xhr.send(data);
    }
  };

  var load = function (onLoad, onError) {
    createXhr(METHOD_GET, URL_GET, onLoad, onError);
  };

  var save = function (data, onLoad, onError) {
    createXhr(METHOD_POST, URL_POST, onLoad, onError, data);
  };

  window.backend = {
    load: load,
    save: save,
  };
})();
