app.directive("component",
  ['ComponentService', '$sce',
  function(ComponentService, $sce){
    return {
      templateUrl: 
        `
        {{renderHtml(component.contents)}}
        `,
      restrict: "A",
      scope: {
        component: '='
      },
      link: function(scope){
        scope.renderHtml = function(html_code) {
          return $sce.trustAsHtml(html_code);
        };
      }
    };
  }]
);
