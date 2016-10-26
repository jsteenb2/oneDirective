app.controller('ProjectEditCtrl',
  ['$stateParams', 'ProjectService', 'currUser', '$scope', 'rowService', "$rootScope",
  function( $stateParams, ProjectService, currUser, $scope, rowService, $rootScope) {

    $scope.currentUser = currUser;
    $scope.config = {
      theme: 'minimal',
      scrollInertia: '500'
    };

    console.log("still logged in through: ",
                $scope.currentUser);
    console.log('you are in projectEdit controller');

    $scope.rows = function(){
      var rows = rowService.getRows();
      return rows;
    };

    $rootScope.$on('component.moved', function(ev){
      $scope.rows();
    });

    //don't really need this
    // $scope.project = ProjectService.get($stateParams.id);
    //only rows relevant to project
    // $scope.rows = RowService.get($stateParams.id);


}]);
