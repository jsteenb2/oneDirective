app.directive('droppable', ['$compile', '$rootScope', '_', function($compile, $rootScope, _) {
  return {
    restrict: 'A',
    link: function(scope,element,attrs){
      element.droppable({
        accept: ".draggable",
        tolerance: 'pointer',
        classes: {
          'ui-droppable-hover': 'drop-row'
        },
        drop: function(event,ui) {
          // event.target.append(ui.draggable[0]);
          // var nodes = angular
          //     .element(event.target)
          //     .find('my-component.draggable');
          // nodes = _.map(nodes, function(node){
          //   return angular.element(node).data('component-id');
          // });
          // var ids = [];
          // _.forEach(nodes, function(id){
          //   ids.unshift(id);
          // });
          // var params = {
          //   rowId: angular.element(event.target).data('row-id'),
          //   componentId: angular.element(ui.draggable[0]).data('component-id'),
          //   componentIds: ids
          // };
          // $rootScope.$broadcast('component-dropped', params);
        }
      });
      element.sortable({
        helper: 'clone',
        grid: [20, 10],
        scroll: true,
        cursor: 'move',
        placeholder: "sortable-placeholder"
      });
      $rootScope.$on('disable-dragging', function(){
        element.sortable('disable');
      });
      $rootScope.$on('enable-dragging', function(){
        element.sortable({
          helper: 'clone',
          grid: [20, 10],
          scroll: true,
          cursor: 'move',
          placeholder: "sortable-placeholder"
        });
        element.sortable('enable');
      });
    }
  };
}]);
