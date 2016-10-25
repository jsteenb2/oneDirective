app.factory('DragdropService', [function () {
  var srv = {};

  var _data = {};
  // When the user drops a component, the Service promises the target component.
  // While the source is waiting for the promise to be fulfilled, the Service
  // gets the target component.
  // When the Service gets the target component, the Service returns it to the
  // source.
  // Upon fulfillment, the source swaps ids with the target.

  function _setPromise (promise) {
    _data.promise = promise;
  }

  srv.promiseTarget = function (component) {
    var promise = Promise.resolve(component);
    _setPromise(promise);
  };

  srv.getPromise = function () {
    return _data.promise;
  };

  return srv;
}]);
