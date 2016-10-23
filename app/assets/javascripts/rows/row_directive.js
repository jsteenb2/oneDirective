app.directive("row",
  ['RowService',
  function(RowService){
    return {
      templateUrl: 
        `
        <components 
          ng-repeat="component in components | filter:{row_id:{{row.id}}}"
          component="component">    
        </components>
        `,
      restrict: "A",
      scope: {
        row: '='
      },
      link: function(scope){
      };
    };
  };
}]);
