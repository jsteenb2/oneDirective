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
  
  $scope.publishProject = function(ev){
    ev.preventDefault();
    $scope.saveProject(ev)
      .then(function(ev){
        publish($stateParams.id)
        ;
      });
  };

  function publish(projectId){
    return Restangular.oneUrl('projects', "api/v1/projects/" + projectId + "/publish.json").withHttpConfig({timeout: 60000})
      .get()
      .then(function(response){
        console.log(response);
      }).catch(function(reason){
        console.error(reason);
      });
  }
}]);
