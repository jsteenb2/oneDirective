app.factory('rowService', ["_", "Restangular", "componentService", function(_, Restangular, componentService){
  var data = {
    cachedRows: [],
    created: [],
    updated: [],
    deleted: []
  };

  var rowService = {};
  var _id = 1;

  rowService.getRows = function(){
    return data.cachedRows;
  };

  var _activateComponent = function(componentType){
    var component = componentService.buildComponent(componentType);
    return component;
  };

  var _reactivateComponent = function(componentType, index, array){
    var component = componentService.rebuildComponent(componentType);
    return component;
  };

  rowService.rebuildComponents = function(compArray){
    compArray.forEach(_reactivateComponent);
  };

  rowService.buildNewComponent = function(componentType, rowId){
    var component = _activateComponent(componentType);
    if (rowId) {
      _addComponentToExistingRow(component, rowId);
    } else {
      _makeNewRow(component);
    }
    _extendComponent(component);
  };

  var _addComponentToExistingRow = function(component, rowId){
    var curRow = _.find(data.cachedRows, function(row){
      return row.id === rowId;
    });
    component.rowId = rowId;
    curRow.components.push(component);
  };

  var _makeNewRow = function(component){
    var newRow = {
      id: _id,
      components: []
    };
    component.rowId = newRow.id;
    newRow.components.push(component);
    data.cachedRows.push(newRow);
    data.created.push(newRow);
    _id++;
  };

  var _addNewTopRow = function(component){
    var newRow = {
      id: _id,
      components: []
    };
    component.rowId = newRow.id;
    newRow.components.push(component);
    data.cachedRows.unshift(newRow);
    data.created.unshift(newRow);
    _id++;
  };

  var _addRowBelow = function(component, nextRowIdx){
    if(data.cachedRows[nextRowIdx].components.length){
      _addToRow(component, nextRowIdx);
    } else {
      _makeNewRow(component);
    }
  };

  var _addToRow = function(component, rowIdx){
    var currentRow = data.cachedRows[rowIdx];
    if (currentRow){
      component.rowId = currentRow.id;
      currentRow.components.push(component);
    } else {
      console.log("in the not currentRow");
      _makeNewRow(component);
    }
  };

  rowService.packageRowsForSave = function(){
    return data.cachedRows.map(_repackage);
  };

  var _repackage = function(row, index){
    var newRow = angular.copy(row, {});
    delete newRow.id;
    newRow.order = index;
    newRow.components = componentService.getPackagedComponents(row.components);
    return newRow;
  };

  var _extendComponent = function(component){
    component.moveLeft = _moveLeft;
    component.moveRight = _moveRight;
    component.moveUp = _moveUp;
    component.moveDown = _moveDown;
  };

  var _findRowIdx = function(rowId){
    var rowIdx = _.findIndex(data.cachedRows, function(row){
      return row.id == rowId;
    });
    return rowIdx;

  };

  var _findComponentIdx = function(component, rowIdx){
    var components = data.cachedRows[rowIdx].components;
    var compIdx = _.findIndex(data.cachedRows[rowIdx].components, function(comp){
      return comp.id == component.id;
    });
    return compIdx;
  };

  var _moveUp = function(){
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
  };

  var _checkEmptyRow = function(rowIdx){
    console.log(data.cachedRows[rowIdx]);
    if(data.cachedRows[rowIdx].components.length < 1){
      console.log('deleted');
      data.cachedRows.splice(rowIdx, 1);
    }
  };

  var _moveDown = function(){
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
  };

  var _moveLeft = function(){
    var rowIdx = _findRowIdx(this.rowId);
    var compIdx = _findComponentIdx(this, rowIdx);
    var that = this;
    if(compIdx > 0){
      data.cachedRows[rowIdx].components.swap( compIdx - 1, compIdx );
    }
  };

  var _moveRight = function(){
    var rowIdx = _findRowIdx(this.rowId);
    var compIdx = _findComponentIdx(this, rowIdx);
    if(compIdx < (data.cachedRows[rowIdx].components.length - 1) ){
      data.cachedRows[rowIdx].components.swap( compIdx + 1, compIdx );
    }
  };

  var swapArrayElements = function(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  };

  Array.prototype.swap = function(indexA, indexB) {
     swapArrayElements(this, indexA, indexB);
  };

  return rowService;
}]);
