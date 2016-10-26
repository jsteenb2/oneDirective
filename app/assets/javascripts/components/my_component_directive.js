app.directive('myComponent', ['$compile', "$rootScope", "$window", "tinyMCEService", 'componentService', 'rowService', function($compile, $rootScope, $window, tinyMCEService, componentService, rowService) {

  return {
    restrict: "E",
    scope: {
      component: "="
    },
    link: function(scope, element, attrs){
      var template = angular.element(scope.component.content)
          .attr('tabindex', scope.component.id);
      var linkFn = $compile(template);
      var content = linkFn(scope);
      element.append(content);
      element.addClass('col-xs-12');

      scope.info = tinyMCEService.info;

      scope.$watch('info.showing', function(newValue, oldValue){
        if(newValue){
          $rootScope.$broadcast('disable-dragging');
          console.log('disabled');
        } else {
          $rootScope.$broadcast('enable-dragging');
          console.log('enabled');
        }
      });


      $rootScope.$on('component-dropped', function(name, params){
        if(params.rowId && params.componentId){
          var component = componentService.getComponentById(params.componentId);
          var row = rowService.getRowById(params.rowId);
          if(row.id == component.rowId && !_.isEmpty(params.componentIds)){
            rowService.changeComponentOrder(params.componentIds, row);
          } else {
            rowService.moveComponentFromRowToRow(component, row);
          }
        }
      });

      scope.dblClick = function($event){
        // $event.stopPropagation();
        var $ele = angular.element($event.target);
        if(scope.doubleClicked){
          $ele.removeClass('hovered');
          tinyMCEService.clearEditors();
        } else {
          $ele.addClass('hovered');
          //if 'it' or its parent is textable
          if ($ele.has('.textable') || $ele.parents().has('.textable').length > 0)
          {
            tinyMCEService.callMCE($ele);
          }
        }// make a toggleClass('hovered')
        scope.doubleClicked = !scope.doubleClicked;
      };
    }
  };
}]);


