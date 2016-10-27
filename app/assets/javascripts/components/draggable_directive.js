app.directive('draggable', ['$rootScope', 'rowService', 'componentService', function($rootScope, rowService, componentService) {
  return {
    restrict:'A',
    link: function(scope, element, attrs) {
      element.draggable({
        revert: true,
        connectToSortable: '.droppable',
        stop: function(event, ui){
          var $component = angular.element(event.target);
          var $row = $component.closest('.row.droppable');
          var nodes = $row.find('component.draggable');
          nodes = _.map(nodes, function(node){
            return angular.element(node).data('component-id');
          });
          var ids = [];
          _.forEach(nodes, function(id){
            ids.push(id);
          });
          var params = {
            rowId: $row.data('row-id'),
            componentId: $component.data('component-id'),
            componentIds: ids
          };
          updateComponent(params);
        }
      });
      $rootScope.$on('disable-dragging', function(){
        element.draggable('disable');
      });
      $rootScope.$on('enable-dragging', function(){
        element.draggable({
          revert: true,
          connectToSortable: '.droppable'
        });
        element.draggable('enable');
      });

      var updateComponent = function(params){
        console.log('dropped');
        if(params.rowId && params.componentId){
          $rootScope.$emit('component.changed', scope.component.id);
          var component = componentService.getComponentById(params.componentId);
          var row = rowService.getRowById(params.rowId);
          if(row.id == component.rowId && !_.isEmpty(params.componentIds)){
            rowService.changeComponentOrder(params.componentIds, row);
          } else {
            rowService.moveComponentFromRowToRow(component, row);
          }
        }
      };

    }
  };
}]);
