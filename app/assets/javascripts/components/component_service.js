app.factory('ComponentService', ['Restangular', '_', function (Restangular, _) {
  var srv = {};
  var _data = {
    cached: [],
    created: {},
    updated: {},
    destroyed: {}
  };

  function _logError (reason) {
    console.log(reason);
    throw new Error ('Failed ajax call!');
  }

  function _cacheAll (response) {
    angular.copy(response, _data.cached);
    return _data;
  }

  function _cacheOne (response) {
    _data.cached.push(response);
    angular.copy(response, _data.created);
    return _data;
  }

  function _updateOne (response) {
    var found = _.find(_data.cached, {id: response.id});
    if (!found) throw new Error ('Nothing to update!');
    angular.copy(response, found);
    angular.copy(response, _data.updated);
    return _data;
  }

  function _removeOne (response) {
    var found = _.find(_data.cached, {id: response.id});
    if (!found) throw new Error ('Nothing to update!');
    _data.destroyed = found;
    _.remove(_data.cached, {id: response.id});
    return _data;
  }

  function _queryAll () {
    return Restangular.all('components')
      .getList()
      .then(_cacheAll)
      .catch(_logError);
  }

  srv.all = function () {
    if (_.isEmpty(_data.cached)) {
      return _queryAll();
    } else {
      return _data;
    }
  };

  srv.get = function(row_id) {
    return _.filter(_data.cached, {row_id: row_id});
  }

  srv.find = function(component_id) {
    return _.filter(_data.cached, {id: parseInt(component_id)})[0];
  };

  srv.create = function (componentParams) {
    return Restangular.all('components')
      .post({project: componentParams})
      .then(_cacheOne)
      .catch(_logError);
  };

  srv.update = function (componentParams) {
    return Restangular.one('components', projectParams.id)
      .patch({project: componentParams})
      .then(_updateOne)
      .catch(_logError);
  };

  srv.destroy = function (component) {
    return component.remove()
      .then(_removeOne)
      .catch(_logError);
  };

  return srv;
}]);
