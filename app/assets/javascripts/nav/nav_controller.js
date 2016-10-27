app.controller('navbarCtrl', ["$scope", "$rootScope", 'currUser', '$stateParams', 'ProjectService', 'Publish', function( $scope, $rootScope, currUser, $stateParams, ProjectService, Publish ){

  $scope.currentUser = currUser;

  $scope.saveProject = function(ev){

    ev.preventDefault();
    // Publish service to handle save anims.
    Publish.saving();
    return ProjectService.saveProjectEdits($stateParams.id)
      .then(function(response){
        Publish.success();
        return response;
      })
      .catch(function(reason){
        console.log(reason);
      });
  };

}]);
