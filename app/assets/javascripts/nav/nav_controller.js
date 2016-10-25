app.controller('navbarCtrl', ["$scope", "$rootScope", 'currUser', '$stateParams', 'ProjectService', function( $scope, $rootScope, currUser, $stateParams, ProjectService ){

  $scope.currentUser = currUser;

  $scope.saveProject = function(ev){
    ev.preventDefault();
    return ProjectService.saveProjectEdits($stateParams.id)
      .then(function(response){
        console.log(response);
        return response;
      })
      .catch(function(reason){
        console.log(reason);
      });
  };


  // $scope.saveProject = function(){
  //   $rootScope.$broadcast('save.project');
  // };
}]);
