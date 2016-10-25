app.controller('ProjectEditCtrl',
  ['$stateParams', 'ProjectService', 'currUser', '$scope', 'rowService', "$rootScope", "projectData",
  function( $stateParams, ProjectService, currUser, $scope, rowService, $rootScope, projectData ) {
    console.log(projectData);

    $scope.currentUser = currUser;

    $scope.rows = function(){
      return rowService.getRows();
    };

    $rootScope.$on('component.moved', function(ev){
      $scope.rows();
    });
}]);
