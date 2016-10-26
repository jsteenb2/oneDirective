app.factory('componentService', ["_", '$http',
function(_, $http){
  var data = {
    cachedComponents: [],
    created: [],
    updated: [],
    deleted: []
  };

  var componentService = {};
  var _id = 1;
  var componentTypes;

  componentService.clearCache = function(){
    Object.keys(data).forEach(function(listName){
      data[listName] = [];
    });
  };

  componentService.getComponent = function(id){
      return _.find(data.cachedComponents, function(component){
        return component.id == id;
      });
  };

  componentService.deleteComponent = function(component){
    Object.keys(data).forEach(function(name, index, array){
        _.remove(data[name], function(comp){
          return component.id == comp.id;
        });
    });
    data.deleted.push(component);
    // return Promise.resolve("successfully deleted");
  };

  componentService.buildComponent = function(componentType){
    var component = angular.copy(componentTypes[componentType], {});
    component.id = _id;
    data.cachedComponents.push(component);
    data.created.push(component);
    _id++;
    return component;
  };

  componentService.rebuildComponent = function(componentData){
    _extendContent(componentData);
    _trackId(componentData.id);
    data.cachedComponents.push(componentData);
    data.updated.push(componentData);
    return componentData;
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
    var componentObj = { };
    console.log(angular.copy(data, {}));
    _cleanPack(componentObj, components, ["created", "updated", "deleted"]);
    return componentObj;
  };

  function _cleanPack(obj, components, listNames){
    listNames.forEach(function(name){
      var collection = _packageComponents(components, data[name]);
      if (collection.length > 0){
          obj[name] = collection;
      }
      console.log(collection);
    });
    return obj;
  }

  function _packageComponents(components, list){
    return components.map(function(component, index){
      var compIdx = _.findIndex(list, function(comp){
        return component.id == comp.id;
      });
      if (compIdx >= 0){
        var newComponent = angular.copy(component, {});
        newComponent.order = _findOrder(component);
        _cleanContent(newComponent);
        return newComponent;
      }
    });
  }

  function _findOrder(component){
    return _.findIndex(data.cachedComponents, function(comp){
      return component.id == comp.id;
    });
  }

  function _trackId(id){
    if (id >= _id){
      _id = id + 1;
    }
  }

  function _cleanContent(component){
    _removeEditorAttrs(component);
    _removeEditorFunctions(component);
    delete component.rowId;
    component.content = angular.element(component.content).prop('outerHTML');
    return component;
  }

  function _removeEditorFunctions(component){
    delete component.moveUp;
    delete component.moveDown;
    delete component.moveLeft;
    delete component.moveRight;
  }

  function _removeEditorAttrs(component){
    // component.content
    //   .removeClass('ng-scope ng-binding')
    //   .removeAttr('ng-keydown')
    //   .removeAttr('ng-click')
    //   .removeAttr('ng-dblclick')
    //   .removeAttr('data-head')
    //   .removeAttr('ng-class')
    //   .removeAttr('tabindex');

    angular.element(component.content).find('*')
      .removeClass('ng-scope ng-binding')
      .removeAttr('ng-keydown')
      .removeAttr('ng-click')
      .removeAttr('ng-dblclick')
      .removeAttr('data-head')
      .removeAttr('ng-class');
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
