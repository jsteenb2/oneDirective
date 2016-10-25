app.controller('ProjectEditCtrl',
  ['$stateParams', 'ProjectService', 'currUser', '$scope', 'rowService', "$rootScope",
  function( $stateParams, ProjectService, currUser, $scope, rowService, $rootScope ) {

    $scope.currentUser = currUser;

    $scope.rows = function(){
      return rowService.getRows();
    };

    $rootScope.$on('component.moved', function(ev){
      $scope.rows();
    });
}]);
