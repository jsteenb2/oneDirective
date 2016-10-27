app.factory('FlashService', ['pluralize', 'Flash', function (pluralize, Flash) {
  var srv = {};

  function _caps (string) {
    var len = string.length;
    return string.charAt(0).toUpperCase() + string.slice(1,len-1);
  }

  function _checkStatus(status) {
    switch (status) {
      case 'success':
        return 'successfully';
      case 'danger':
        return 'unsuccesfully';
    }
  }

  function _buildMessage (action) {
    return function (status, resource, item) {
      var statusMessage = _checkStatus(status);
      var built = "You've " + statusMessage + " " + action + " a " + _caps(resource) + "!";
      if (item) { built += " (" + item + ")"; }
      return built;
    };
  }

  function _buildFlash (builder) {
    return function (status, resource, item) {
      var message = builder(status, resource, item);
      var $alert = angular.element('div.alert');
      $alert.stop(true,false);
      return Promise.resolve(Flash.create(status, message))
        .then(_fadeFlash);
    };
  }

  function _fadeFlash () {
    var $alert = angular.element('div.alert').last();
    $alert.hide()
      .fadeIn(500)
      .delay(3000)
      .fadeOut(500);
    return $alert;
  }

  var _create = _buildMessage('created');
  var _update = _buildMessage('updated');
  var _destroy = _buildMessage('deleted');

  srv.create = _buildFlash(_create);
  srv.update = _buildFlash(_update);
  srv.destroy = _buildFlash(_destroy);

  srv.custom = function (status, message) {
    return function () {
      return Promise.resolve(Flash.create(status, message))
        .then(_fadeFlash);
    };
  };

  return srv;
}]);