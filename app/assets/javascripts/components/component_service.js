app.factory('componentService', ["_", '$http',
function(_, $http){
  var componentService = {};
  var _id = 1;
  var componentTypes;

  componentService.buildComponent = function(componentType){
    var component = angular.copy(componentTypes[componentType], {});
    component.id = _id;
    _id++;
    return component;
  };

  componentService.cacheComponentLibrary = function(){
    $http.get('components.json')
      .then(function(data){
        componentTypes = data.data;
        return data.data;
      })
      .catch(_logError);
  };

  function _logError (reason) {
    console.log(reason);
    throw new Error ('Failed ajax call!');
  }

  return componentService;
}]);
