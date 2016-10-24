app.factory('rowService', ["_", "Restangular", "componentService", function(_, Restangular, componentService){
  var rowService = {};
  var _rows = [];
  var _id = 1;

  rowService.getRows = function(){
    return _rows;
  };

  var swapArrayElements = function(arr, indexA, indexB) {
    var temp = arr[indexA];
    arr[indexA] = arr[indexB];
    arr[indexB] = temp;
  };

  Array.prototype.swap = function(indexA, indexB) {
     swapArrayElements(this, indexA, indexB);
  };

  var _getRows = function(){
    return _rows;
  };

  var _activateComponent = function(componentType, index, array){
    var component = componentService.buildComponent(componentType);
    return component;
  };

  rowService.rebuildComponents = function(compArray){
    compArray.forEach(_activateComponent);
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

  var _extendComponent = function(component){
    component.moveLeft = _moveLeft;
    component.moveRight = _moveRight;
    component.moveUp = _moveUp;
    component.moveDown = _moveDown;
  };

  var _findRowIdx = function(rowId){
    var rowIdx = _.findIndex(_rows, function(row){
      return row.id == rowId;
    });
    return rowIdx;

  };

  var _findComponentIdx = function(component, rowIdx){
    var components = _rows[rowIdx].components;
    var compIdx = _.findIndex(_rows[rowIdx].components, function(comp){
      return comp.id == component.id;
    });
    return compIdx;
  };

  var _moveUp = function(){
    var rowIdx = _findRowIdx(this.rowId);
    var compIdx = _findComponentIdx(this, rowIdx);
    var comp;
    if(rowIdx > 0){
      comp = _rows[rowIdx].components.splice(compIdx, 1)[0];
      _addToRow(comp, rowIdx - 1);
      _checkEmptyRow(rowIdx);
    } else if( rowIdx === 0 &&
                _rows[rowIdx].components.length > 1 ){
      comp = _rows[rowIdx].components.splice(compIdx, 1)[0];
      _addNewTopRow(comp);
    }
  };

  var _checkEmptyRow = function(rowIdx){
    console.log(_rows[rowIdx]);
    if(_rows[rowIdx].components.length < 1){
      console.log('deleted');
      _rows.splice(rowIdx, 1);
    }
  };

  var _moveDown = function(){
    var rowIdx = _findRowIdx(this.rowId);
    var compIdx = _findComponentIdx(this, rowIdx);
    var comp;
    if(rowIdx < _rows.length - 1){
      comp = _rows[rowIdx].components.splice(compIdx, 1)[0];
      _addRowBelow(comp, rowIdx + 1);
      _checkEmptyRow(rowIdx);
    } else if (_rows[rowIdx].components.length > 1 ){
      comp = _rows[rowIdx].components.splice(compIdx, 1)[0];
      _makeNewRow(comp);
    }
  };

  var _addRowBelow = function(component, nextRowIdx){
    if(_rows[nextRowIdx].components.length){
      _addToRow(component, nextRowIdx);
    } else {
      _makeNewRow(component);
    }
  };

  var _addToRow = function(component, rowIdx){
    var currentRow = _rows[rowIdx];
    if (currentRow){
      component.rowId = currentRow.id;
      currentRow.components.push(component);
    } else {
      console.log("in the not currentRow");
      _makeNewRow(component);
    }
  };

  var _moveLeft = function(){
    var rowIdx = _findRowIdx(this.rowId);
    var compIdx = _findComponentIdx(this, rowIdx);
    var that = this;
    if(compIdx > 0){
      _rows[rowIdx].components.swap( compIdx - 1, compIdx );
    }
  };

  var _moveRight = function(){
    var rowIdx = _findRowIdx(this.rowId);
    var compIdx = _findComponentIdx(this, rowIdx);
    if(compIdx < (_rows[rowIdx].components.length - 1) ){
      _rows[rowIdx].components.swap( compIdx + 1, compIdx );
    }
  };

  var _addComponentToExistingRow = function(component, rowId){
    var curRow = _.find(_rows, function(row){
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
    _rows.push(newRow);
    _id++;
  };

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

  return rowService;
}]);
