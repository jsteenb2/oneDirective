app.directive('myComponent', ['$compile', "$rootScope", "$window", "tinyMCEService", function($compile, $rootScope, $window, tinyMCEService) {

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
      element.addClass('col-xs-4');

      scope.dblClick = function($event){
        console.log('fired double');
        $event.stopPropagation();
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


