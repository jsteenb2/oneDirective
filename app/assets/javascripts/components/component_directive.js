app.directive('component', ['$compile', "$rootScope", "$window", function($compile, $rootScope, $window) {

  return {
    restrict: "E",
    scope: {
      component: "="
    },
    link: function(scope, element, attrs){
      scope.hovered = false;
      scope.doubleClicked = false;
      var template = angular.element(scope.component.content)
        .attr('tabindex', scope.component.id);
      var linkFn = $compile(template);
      var content = linkFn(scope);
      element.append(content);

      scope.onClick = function($event){
        $event.stopPropagation();
        scope.hovered = !scope.hovered;
        $rootScope.$emit('selected.component', scope.component.id);
      };

      scope.dblClick = function($event){
        $event.stopPropagation();
        var $ele = angular.element($event.target);
        if(scope.doubleClicked){
          $ele.removeClass('hovered');
        } else {
          $ele.addClass('hovered');
        }// make a toggleClass('hovered')
        scope.doubleClicked = !scope.doubleClicked;
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
         $rootScope.$emit('component.moved');
      };
    }
  };
}]);
