app.factory('componentService', ["_", '$http', 'FlashService', 'Restangular',
function(_, $http, FlashService, Restangular){
  var data = {
    cachedComponents: [],
    created: [],
    updated: [],
    deleted: []
  };
  var _baseComponents;


  var componentService = {};
  var _id = 1;
  var componentTypes;

  componentService.getComponentById = function(id){
    return _.find(data.cachedComponents, function(component){
      return component.id == id;
    });
  };

  componentService.getData = function() {
    return data;
  };
  componentService.getBase = function() {
    return _baseComponents;
  };

  componentService.clearCache = function(){
    Object.keys(data).forEach(function(listName){
      data[listName] = [];
    });
  };

  componentService.getComponent = function(compId){
    var compIdx = _.findIndex(data.cachedComponents, function(comp){
      return comp.id == compId;
    });
    return data.cachedComponents[compIdx];
  };

  componentService.deleteComponent = function(component){
    Object.keys(data).forEach(function(name, index, array){
      var compIdx = _.findIndex(data[name], function(comp){
        return component.id == comp.id;
      });
      data[name].splice(compIdx, 1);
    });
    delete component.rowId;
    data.deleted.push(component);
  };

  componentService.buildComponent = function(componentType){
    var component = angular.copy(componentTypes[componentType], {});
    component.id = _id;
    // Need to give the component's html content an id to match later on.
    angular.element(component.content[0]).attr('data-component-id', _id);
    console.log(component);
    data.cachedComponents.push(component);
    data.created.push(component);
    _id++;
    // Flash messages.
    FlashService.create('success', 'components', component.name);
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
        _baseComponents = data;
        componentTypes = data.data;
        _.each(componentTypes, function(component){
          _extendContent(component);
        });
        return data.data;
      })
      .catch(_logError);
  };

  componentService.componentKeys = function(){
    return Object.keys(componentTypes);
  };

  componentService.getPackagedComponents = function(components){
    var componentObj = { };
    _cleanPack(componentObj, components, ["created", "updated", "deleted"]);
    return componentObj;
  };

  function _cleanPack(obj, components, listNames){
    _.each(listNames, function(name){
      var collection = _packageComponents(components, data[name]);
      if (collection.length > 0 && collection[0]){
        obj[name] = collection;
      }
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
        console.log(newComponent);
        console.log(data.cachedComponents);
        _cleanContent(newComponent);
        return newComponent;
      }
    });
  }

  //fix this
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
    angular.element(component.content).find('*')
      .removeClass('ng-scope ng-binding')
      .removeAttr('ng-keydown')
      .removeAttr('ng-click')
      .removeAttr('ng-dblclick')
      .removeAttr('data-head')
      .removeAttr('ng-class');
  }

  //adds textable class to every text-type element
  //so that tinymce listeners can proc it.
  function _addTextable($content) {
    //has content
    $content.find('a').addClass('textable');
    $content.find('p').addClass('textable');
    $content.find('h1').addClass('textable');
    $content.find('h2').addClass('textable');
    $content.find('h3').addClass('textable');
    $content.find('code').addClass('textable');
    $content.find('span').addClass('textable');

    // is content
    $content.addClass('textable');
  }

  function _extendContent(component){

    // var wrapped = angular.element('<div class="col-xs-12 tipped">');
    // var newContent = angular.element(component.content).wrap(wrapped).parent();

    // newContent

    component.content = angular.element(component.content)
      .attr('ng-keydown', 'moveComponent($event)')
      .attr('ng-click', 'onClick($event)')
      .attr('ng-dblclick', 'dblClick($event)')
      .attr('data-head', 'head')
      .attr('ng-class', "{ 'hovered': hovered }");
    _addTextable(component.content);
  }



  function _logError (reason) {
    console.log(reason);
    throw new Error ('Failed ajax call!');
  }

  return componentService;
}]);
