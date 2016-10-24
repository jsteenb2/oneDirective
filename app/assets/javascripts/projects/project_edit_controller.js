app.controller('ProjectEditCtrl',
  ['$stateParams', 'ProjectService', 'currUser', '$scope', 'rowService', "$rootScope", "rowData",
  function( $stateParams, ProjectService, currUser, $scope, rowService, $rootScope, rowData) {

    $scope.currentUser = currUser;

    console.log("still logged in through: ",
      $scope.currentUser);
    console.log('you are in projectEdit controller');

    $scope.rowData = rowData;

    $rootScope.$on('component.moved', function(ev){
      $scope.rows();
    });

    //don't really need this
    // $scope.project = ProjectService.get($stateParams.id);
    //only rows relevant to project
    // $scope.rows = RowService.get($stateParams.id);


}]);
