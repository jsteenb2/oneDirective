app.controller('navbarCtrl', ["$scope", "$rootScope", 'currUser', function( $scope, $rootScope, currUser ){

  $scope.currentUser = currUser;

  $scope.saveProject = function(){
    $rootScope.broadcast('save.project');
  };
}]);
