app.factory('rowService', ["_", "Restangular", "componentService", function(_, Restangular, componentService){
  var data = {
    cachedRows: [],
    created: [],
    updated: [],
    deleted: []
  };
  var rowService = {};
  var _id = 1;

  rowService.getComponentOrder = function(component){
    var row = rowService.getRowById(component.rowId);
    var index = _.findIndex(row.components, function(rowComponent){
      return rowComponent.id == component.id;
    });
    return index;
  };

  function _getComponentRow(component){
    return _.find(data.cachedRows, function(row){
      return row.id == component.rowId;
    });
  };

  rowService.getComponentRow = function(component){
    return _getComponentRow(component);
  };

  rowService.getRowById = function(id){
    return _.find(data.cachedRows, function(row){
      return row.id == id;
    });
  };

  var _getRowIdx = function(rowId){
    return _.findIndex(data.cachedRows, function(row){
      return row.id == rowId;
    });
  };

  rowService.clearCache = function(){
    componentService.clearCache();
    Object.keys(data).forEach(function(listName){
      data[listName] = [];
    });
  };

  var _removeComponentFromRow = function(component){
    var row = rowService.getRowById(component.rowId);
    var componentIndex = _.findIndex(row.components, function(rowComponent){
      return rowComponent.id == component.id;
    });
    row.components.splice(componentIndex, 1);
    _checkEmptyRow(_getRowIdx(component.rowId));
    component.rowId = undefined;
  };

  rowService.moveComponentFromRowToRow = function(component, toRow){
    _removeComponentFromRow(component);
    _addComponentToExistingRow(component, toRow.id);
  };

  rowService.getRows = function(){
    return data.cachedRows;
  };

  function _activateComponent(componentType){
    var component = componentService.buildComponent(componentType);
    return component;
  }

  function  _reactivateComponent(componentType, index, array){
    var component = componentService.rebuildComponent(componentType);
    _extendComponent(component);
    return component;
  }

  rowService.rebuildRows = function(rows){
    rows.forEach(_reactivateRows);
  };

  function _reactivateRows(ele, index, array){
    var newRow = angular.copy(ele, {});
    _rebuildComponents(newRow.components);
    _trackId(newRow.id);
    data.cachedRows.push(newRow);
    data.updated.push(newRow);
  }

  function _rebuildComponents(compArray){
    compArray.forEach(_reactivateComponent);
  }

  rowService.buildNewComponent = function(componentType, rowId){
    var component = _activateComponent(componentType);
    if (rowId) {
      _addComponentToExistingRow(component, rowId);
    } else {
      _makeNewRow(component);
    }
    _extendComponent(component);
  };

  rowService.changeComponentOrder = function(componentIds, row){
    var newComponentArray = [];
    _.forEach(componentIds, function(id){
      var component = componentService.getComponentById(id);
      newComponentArray.push(component);
    });
    angular.copy(newComponentArray, row.components);
  };

  function _addComponentToExistingRow(component, rowId){
    var curRow = _.find(data.cachedRows, function(row){
      return row.id === rowId;
    });
    component.rowId = rowId;
    curRow.components.push(component);
  }

  function _makeNewRow(component){
    var newRow = {
      id: _id,
      components: []
    };
    component.rowId = newRow.id;
    newRow.components.push(component);
    data.cachedRows.push(newRow);
    data.created.push(newRow);
    _id++;
  }

  function _addNewTopRow(component){
    var newRow = {
      id: _id,
      components: []
    };
    component.rowId = newRow.id;
    newRow.components.push(component);
    data.cachedRows.unshift(newRow);
    data.created.unshift(newRow);
    _id++;
  }

  function _addRowBelow(component, nextRowIdx){
    if(data.cachedRows[nextRowIdx].components.length){
      _addToRow(component, nextRowIdx);
    } else {
      _makeNewRow(component);
    }
  }

  function _addToRow(component, rowIdx){
    var currentRow = data.cachedRows[rowIdx];
    if (currentRow){
      component.rowId = currentRow.id;
      currentRow.components.push(component);
    } else {
      _makeNewRow(component);
    }
  }

  rowService.packageRowsForSave = function(){
    var rows = { };
    _cleanPack(rows, ["created", "updated", "deleted"]);
    return rows;
  };

  function _cleanPack(obj, listNames){
    listNames.forEach(function(name){
      var collection = data[name].map(_repackage);
      if (collection.length > 0){
        obj[name] = collection;
      }
    });
    return obj;
  }

  function _repackage(row, index){
    var newRow = angular.copy(row, {});
    newRow.order = _findOrder(row);
    newRow.components = componentService.getPackagedComponents(row.components);
    _reorderComponents(newRow);
    return newRow;
  }

  var _getComponentRowId = function(id){
    return componentService.getComponentById(id).rowId;
  };

  var _reorderComponents = function(row){
    _.forEach(row.components.updated, function(component){
      if(component){
        component.rowId = _getComponentRowId(component.id);
        component.order = rowService.getComponentOrder(component);
      }
    });
    return row;
  };


  function _extendComponent(component){
    component.moveLeft = _moveLeft;
    component.moveRight = _moveRight;
    component.moveUp = _moveUp;
    component.moveDown = _moveDown;
    component.remove = _removeComponent;
  };

  function _removeComponent(){
    var rowIdx = _findRowIdx(this.rowId, data.cachedRows);
    var compIdx = _findComponentIdx(this, rowIdx);
    data.cachedRows[rowIdx].components.splice(compIdx, 1);
    return Promise.resolve(componentService.deleteComponent(this)).then(function(response){
      _checkEmptyRow(rowIdx);
      return;
    });

  }

  function _findRowIdx(rowId, listName){
    var list = data[listName] || data.cachedRows;
    var rowIdx = _.findIndex(list, function(row){
      return row.id == rowId;
    });
    return rowIdx;
  }

  function _findComponentIdx(component, rowIdx){
    var compIdx = _.findIndex(data.cachedRows[rowIdx].components, function(comp){
      return comp.id == component.id;
    });
    return compIdx;
  }

  function _moveUp (){
    var rowIdx = _findRowIdx(this.rowId);
    var compIdx = _findComponentIdx(this, rowIdx);
    var comp;
    if(rowIdx > 0){
      comp = data.cachedRows[rowIdx].components.splice(compIdx, 1)[0];
      _addToRow(comp, rowIdx - 1);
      _checkEmptyRow(rowIdx);
    } else if( rowIdx === 0 &&
                data.cachedRows[rowIdx].components.length > 1 ){
      comp = data.cachedRows[rowIdx].components.splice(compIdx, 1)[0];
      _addNewTopRow(comp);
    }
  }

  function _checkEmptyRow(rowIdx){
    if(data.cachedRows[rowIdx].components.length < 1){
      _removeFromDataObj(rowIdx);
    }
  }

  function _removeFromDataObj(rowIdx){
    var keys = ["created", "updated"];
    var curRow = data.cachedRows.splice(rowIdx, 1)[0];
    keys.forEach(function(keyName, index, arr){
      var rowIdx = _findOrder(curRow, keyName);
      if(rowIdx >= 0){
        data[keyName].splice(rowIdx, 1);
        if(keyName === "updated"){
          data.deleted.push(curRow);
        }
      }
    });
  }

  function _findOrder(row, listName){
    var list = data[listName] || data.cachedRows;
    var idx =  _.findIndex(list, function(_row){
      return row.id == _row.id;
    });
    return idx;
  }

  function _moveDown(){
    var rowIdx = _findRowIdx(this.rowId);
    var compIdx = _findComponentIdx(this, rowIdx);
    var comp;
    if(rowIdx < data.cachedRows.length - 1){
      comp = data.cachedRows[rowIdx].components.splice(compIdx, 1)[0];
      _addRowBelow(comp, rowIdx + 1);
      _checkEmptyRow(rowIdx);
    } else if (data.cachedRows[rowIdx].components.length > 1 ){
      comp = data.cachedRows[rowIdx].components.splice(compIdx, 1)[0];
      _makeNewRow(comp);
    }
  }

  function _moveLeft(){
    var rowIdx = _findRowIdx(this.rowId);
    var compIdx = _findComponentIdx(this, rowIdx);
    var that = this;
    if(compIdx > 0){
      data.cachedRows[rowIdx].components.swap( compIdx - 1, compIdx );
    }
  }

  function _moveRight(){
    var rowIdx = _findRowIdx(this.rowId);
    var compIdx = _findComponentIdx(this, rowIdx);
    if(compIdx < (data.cachedRows[rowIdx].components.length - 1) ){
      data.cachedRows[rowIdx].components.swap( compIdx + 1, compIdx );
    }
  }

  function swapArrayElements(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  }

  Array.prototype.swap = function(indexA, indexB) {
     swapArrayElements(this, indexA, indexB);
  };

  // rowService.addEmptyRow = function(){
  //   var newRow = {id: _id, components: []};
  //   _rows.push(newRow);
  //   _id++;
  // };

  var _addNewTopRow = function(component){
    var newRow = {
      id: _id,
      components: []
    };
    component.rowId = newRow.id;
    newRow.components.push(component);
    _rows.unshift(newRow);
    _id++;
  };

  function _trackId(id){
    if (id >= _id){
      _id = id + 1;
    }
  }

  return rowService;
}]);
