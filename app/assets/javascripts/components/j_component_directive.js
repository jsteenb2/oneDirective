app.directive('jcomponent',
  ['$compile', "$rootScope", "$window", "tinyMCEService",
  function($compile, $rootScope, $window, tinyMCEService) {

  return {
    restrict: "E",
    scope: {
      component: "="
    },
    link: function(scope, element, attrs){

      $rootScope.$on('component.changed', function(ev, compId){
        if(scope.component.id == compId){
          element.remove();
          scope.$destroy();
        }
      });

      scope.hovered = false;
      scope.doubleClicked = false;
      element.attr('data-comp-id', scope.component.id);
      var template = angular.element(scope.component.content)
        .attr('tabindex', scope.component.id);
      var linkFn = $compile(template);
      var content = linkFn(scope);
      element.append(content);
      console.log(element);
      content.attr('draggable', true);
      content.addClass('draggable');

      scope.onClick = function($event){
        $event.stopPropagation();
        scope.hovered = !scope.hovered;
        $rootScope.$emit('selected.component', scope.component.id);
      };

      $rootScope.$on('selected.component', function(ev, id){
        if (scope.component.id !== id){
          scope.hovered = false;
        }
      });

      scope.moveComponent = function(ev){
        if (scope.hovered){
          ev.preventDefault();
          arrowListener(ev);
        }
      };

      var arrowListener = function(ev){
         if (ev.which == 37){
           // left arrow
           scope.component.moveLeft();
           console.log("left arrow");
         } else if (ev.which == 39){
           // right arrow
           scope.component.moveRight();
           console.log("right arrow");
         } else if (ev.which == 40){
           // down arrow
           scope.component.moveDown();
         } else if (ev.which == 38){
           // up arrow
           scope.component.moveUp();
           console.log("up arrow");
         }
         $rootScope.$emit('component.changed');
      };
    }
  };
}]);
