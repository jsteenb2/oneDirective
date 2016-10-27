app.directive('droppable', ['$compile', '$rootScope', '_', function($compile, $rootScope, _) {
  return {
    restrict: 'A',
    link: function(scope,element,attrs){
      element.droppable({
        accept: ".draggable",
        tolerance: 'pointer',
        classes: {
          'ui-droppable-hover': 'drop-row'
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
