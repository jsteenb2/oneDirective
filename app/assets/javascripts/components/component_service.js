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
        _.each(componentTypes, function(component){
          _extendContent(component);
        });
        console.log(componentTypes);
        return data.data;
      })
      .catch(_logError);
  };

  componentService.componentKeys = function(){
    return Object.keys(componentTypes);
  };

  componentService.getPackagedComponents = function(components){
    return components.map(function(component, index){
      var newComponent = angular.copy(component, {});
      delete newComponent.id;
      newComponent.order = index;
      _cleanContent(newComponent);
      return newComponent;
    });
  };

  function _cleanContent(component){
    component.content
      .removeAttr('ng-keydown')
      .removeAttr('ng-click')
      .removeAttr('ng-dblclick')
      .removeAttr('data-head')
      .removeAttr('ng-class')
      .removeAttr('tabindex');
    component.content = angular.element(component.content).prop('outerHTML');
    return component;
  }

  function _extendContent(component){
    component.content = angular.element(component.content)
      .attr('ng-keydown', 'moveComponent($event)')
      .attr('ng-click', 'onClick($event)')
      .attr('ng-dblclick', 'dblClick($event)')
      .attr('data-head', 'head')
      .attr('ng-class', "{ 'hovered': hovered }");
  }

  function _logError (reason) {
    console.log(reason);
    throw new Error ('Failed ajax call!');
  }

  return componentService;
}]);
