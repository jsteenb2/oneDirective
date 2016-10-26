app.directive('draggable', ['$rootScope', function($rootScope) {
  return {
    restrict:'A',
    link: function(scope, element, attrs) {
      element.draggable({
        revert: true,
        connectToSortable: '.droppable',
        stop: function(event, ui){
          var $component = angular.element(event.target);
          var $row = $component.closest('.row.droppable');
          var nodes = $row.find('my-component.draggable');
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
          $rootScope.$broadcast('component-dropped', params);
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
    }
  };
}]);
