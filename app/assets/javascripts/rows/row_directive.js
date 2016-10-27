app.directive('row', ['$rootScope', '$compile', '$document', function($rootScope, $compile, $document) {
  return {
    restrict: "A",
    scope: {
      row: "="
    },
    templateUrl: '/templates/rows/row_directive.html',
    link: function(scope, element, attrs){
      scope.hovered = false;
      scope.toggleSelected = function(){
        if(!element.hasClass('selected-row')){
          element.addClass('selected-row');
        } else {
          element.removeClass('selected-row');
        }
        $rootScope.$emit('selected.row', scope.row.id);
      };
      element.on('click', function(){
        scope.toggleSelected();
      });

      angular.element($document).on('click', function(event){
        var $target = angular.element(event.target);
        if(!$target.hasClass('selected-row')){
          angular.element('.selected-row').removeClass('selected-row');
          $rootScope.$emit('selected.row', false);
        }
      });

        $rootScope.$on('selected.row', function(ev, id){
          if (scope.row.id !== id){
            scope.hovered = false;
          }
        });

        $rootScope.$on('component.changed', function(ev){
          _checkComponentsEmpty();
        });

        function _checkComponentsEmpty(){
          if(_.isEmpty(scope.row.components)){
            element.remove();
            scope.$destroy();
          }
        }
    }
  };
}]);
