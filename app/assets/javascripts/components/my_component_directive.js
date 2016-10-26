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
    }
  };
}]);
