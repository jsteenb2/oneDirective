app.directive('component',
  ['$compile', "$rootScope", "$window", "tinyMCEService", 'componentService',
  function($compile, $rootScope, $window,tinyMCEService, componentService) {

  return {
    restrict: "E",
    scope: {
      component: "="
    },
    link: function(scope, element, attrs){
      // adds col-xs-12 and tipped
      angular.element(element)
        .addClass('col-xs-12 tipped');

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

      // updating dimensions
      $rootScope.$on('dimensions.update', function (ev, arg) {
        var compId = arg.component.attributes['data-component-id'].value;
        var newWidth = arg.width;
        var newOffset = arg.offset;
        var component = componentService.getComponent(compId);
        component.width = arg.width;
        component.offset = arg.offset;
      });
    }
  };
}]);
