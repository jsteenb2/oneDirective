app.directive('row', ['$rootScope',
function($rootScope) {

  return {
    restrict: "E",
    scope: {
      row: "="
    },
    templateUrl: '/templates/rows/row_directive.html',
    link: function(scope, element, attrs){
        scope.hovered = false;
        scope.selectRow = function(){
          scope.hovered = !scope.hovered;
          $rootScope.$emit('selected.row', scope.row.id);
        };

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
