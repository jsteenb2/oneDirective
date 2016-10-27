app.factory('ProjectService', ['Restangular', '_', 'rowService', function (Restangular, _, rowService) {
  var srv = {};
  var _data = {
    cached: [],
    created: {},
    updated: {},
    destroyed: {}
  };

  srv.all = function () {
    if (_.isEmpty(_data.cached)) {
      return _queryAll();
    } else {
      return _data;
    }
  };

  srv.getProjectData = function(project_id){
    return Restangular.one('projects', project_id).get()
      .then(function(data){
        console.log('resolve running');
        console.log(data.project);
        return rowService.rebuildRows(data.project.rows);
      });
  };

  srv.create = function (params) {
    return Restangular.all('projects')
      .post({project: params})
      .then(_cacheOne)
      .catch(_logError);
  };

  srv.update = function (params) {
    return Restangular.one('projects', params.id)
      .patch({project: params})
      .catch(_logError);
  };

  srv.destroy = function (project) {
    return project.remove()
      .then(_removeOne)
      .catch(_logError);
  };

  srv.saveProjectEdits = function(id){
    var projectParams = {
      rows: rowService.packageRowsForSave()
    };
    projectParams.id = id;
    console.log(projectParams);
    return srv.update(projectParams)
              .then(function(data){
                rowService.clearCache();
                rowService.rebuildRows(data.project.rows);
                return data;
              });
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
    return Restangular.all('projects')
      .getList()
      .then(_cacheAll)
      .catch(_logError);
  }

  return srv;
}]);
