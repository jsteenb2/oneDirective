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
    return function (status, resource) {
      var statusMessage = _checkStatus(status);
      return "You've " + statusMessage + " " + action + " a " + _caps(resource) + "!";
    };
  }

  function _buildFlash (builder) {
    return function (status,resource) {
      var message = builder(status,resource);
      return Flash.create(status, message);
    };
  }

  var _create = _buildMessage('created');
  var _update = _buildMessage('updated');
  var _destroy = _buildMessage('deleted');

  srv.create = _buildFlash(_create);
  srv.update = _buildFlash(_update);
  srv.destroy = _buildFlash(_destroy);

  return srv;
}]);
