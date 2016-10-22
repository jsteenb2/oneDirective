// e.g. $injector.instantiate(ResourceGenerator.generate('users'))
// Inject $injector in a controller and run that line to instantiate a generated service.

app.factory('ResourceGenerator',
['Restangular', '_', 'pluralize', function(Restangular, _, pluralize) {

  var srv = {};

  function _getFactoryConfig (resource, baseUrl, suffix) {
    return ['Restangular','_','pluralize', function (Restangular,_,pluralize) {
      // The generator will target the proper endpoint for you. Just give it
      // the baseUrl and the suffix.
      var restangular = Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setBaseUrl(baseUrl);
        RestangularConfigurer.setRequestSuffix(suffix);
      });

      var rSrv = {};

      // Container for all data pertaining to the resource.
      var _data = {
        cached: [],
        type: resource,
        one: undefined,
        added: undefined,
        updated: undefined,
        destroyed: undefined
      };

      function _logError (reason) {
        console.log(reason);
        throw new Error(reason);
      }

      function _cachedData (response) {
        angular.copy(response,_data.cached);
        return _data;
      }

      function _addOne (response){
        _data.cached.push(response);
        _data.added = response;
        return _data;
      }

      function _updateOne (response){
        var found = _.find(_data.cached, {id: response.id});
        if (!found) throw new Error('Nothing to update!');
        angular.copy(response,found);
        _data.updated = found;
        return _data;
      }

      function _removeOne (model) {
        var found = _.find(model, {id: model.id});
        if (!found) throw new Error('Nothing to remove!');
        _data.destroyed = found;
        _.remove(_data.cached, {id: model.id});
        return _data;
      }

      function _queryAll (resource) {
        return restangular.all(resource)
          .getList()
          .then(_cachedData)
          .catch(_logError);
      }

      rSrv.all = function () {
        if (_.isEmpty(_data.cached)) {
          return _queryAll(resource);
        } else {
          return _data;
        }
      };

      rSrv.one = function (id) {
        if (_.isEmpty(_data.cached)) {
          _queryAll(resource);
          _data.one = _.find(_data.cached, {id: id});
          return Promise.resolve(_data);
        } else {
          _data.one = _.find(_data.cached, {id: id});
          return Promise.resolve(_data);
        }
      };

      rSrv.create = function (params) {
        var required = pluralize.plural(resource, 1);
        return restangular.all(resource)
          .post({required: params})
          .catch(_logError)
          .then(_addOne);
      };

      rSrv.update = function (params) {
        var required = pluralize.plural(resource, 1);
        return restangular.one(resource, params.id)
          .patch({required: params})
          .then(_updateOne)
          .catch(_logError);
      };

      rSrv.destroy = function (model) {
        var required = pluralize.plural(resource, 1);
        return model.destroy()
          .then(_removeOne(model))
          .catch(_logError);
      };

      return rSrv;
    }];
  }

  // Input a module name and resource.
  srv.generate = function (resource, baseUrl, suffix, moduleVar) {
    function _caps (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // e.g. ResourceGenerator.generate('users') will just return the config.
    if (!moduleVar) {
      return _getFactoryConfig(resource, baseUrl, suffix);
    }

    // e.g. ResourceGenerator.generate('users', app) will generate a factory.
    // Build a factory for that module, using the resource.
    moduleVar.factory(_caps(resource) + 'Service', _getFactoryConfig(resource, baseUrl, suffix));
  };

  return srv;

}]);
