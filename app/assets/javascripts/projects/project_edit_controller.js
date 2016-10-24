app.controller('ProjectEditCtrl',
  ['$stateParams', 'ProjectService', 'currUser', '$scope',
  function( $stateParams, ProjectService, currUser, $scope) {

    $scope.currentUser = currUser;

    console.log("still logged in through: ",
      $scope.currentUser);
    console.log('you are in projectEdit controller');


    //don't really need this
    // $scope.project = ProjectService.get($stateParams.id);
    //only rows relevant to project
    // $scope.rows = RowService.get($stateParams.id);


}]);
