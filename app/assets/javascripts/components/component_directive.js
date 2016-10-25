app.directive('component',
  ['$compile', "$rootScope", "$window", "tinyMCEService", 'DragdropService',
  function($compile, $rootScope, $window,tinyMCEService, DragdropService) {

  return {
    restrict: "E",
    scope: {
      component: "=",
      index: "=",
      row: "="
    },
    link: function(scope, element, attrs){
      scope.hovered = false;
      scope.doubleClicked = false;

      scope.updateRowId = function (component) {
        scope.component.rowId = scope.row.id;
      };

      scope.promiseTarget = function () {
        return DragdropService.promiseTarget(scope.component)
          .then(function(target) {
            scope.component.rowId = target.rowId;
          });
      };

      scope.getPromise = function () {
        return DragdropService.getPromise().then(function(target) {
          var targetId = target.rowId;
          scope.component.rowId = targetId;
          target.rowId = scope.component.rowId;
          return target;
        });
      };

[
  {"type":"toggleButton","content":{"0":{"jQuery112407167617259214201":67},"length":1},"id":1,"rowId":1},
  {"type":"authorBox","content":{"0":{},"1":{"jQuery112407167617259214201":159},"2":{},"length":3},"id":5,"rowId":2,"undefined":"right"},
  {"type":"navbarDefault","content":{"0":{"jQuery112407167617259214201":189},"length":1},"id":6,"rowId":2}
]

      scope.logThis = function () {
        console.log(scope.row.id);
      };

      // CJ: added attrs scope.row and scope.index for DnD
      // Going to row to row: they don't track by index. Need to track by id.
      var template = angular.element(scope.component.content)
        .attr('tabindex', scope.component.id);
      template
        .attr('data-drag', "true")
        .attr('data-drop', "true")
        .attr('ng-model', "row.components")
        .attr('jqyoui-droppable',"{index:{{index}}}")
        .attr('jqyoui-draggable',"{index:{{index}},insertInline:true,animate:true}")
        .attr('data-jqyoui-options',"{revert: 'invalid'}");
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
         $rootScope.$emit('component.moved');
      };
    }
  };
}]);
