app.controller('navbarCtrl', ["$scope", "$rootScope", 'currUser', '$stateParams', 'ProjectService', 'Cog', 'Restangular', function( $scope, $rootScope, currUser, $stateParams, ProjectService, Cog, Restangular ){

  $scope.currentUser = currUser;

  $scope.saveProject = function(ev){
    ev.preventDefault();
    // Cog service to handle save anims.
    Cog.saving();
    return ProjectService.saveProjectEdits($stateParams.id)
      .then(function(response){
        Cog.success();
        return response;
      })
      .catch(function(reason){
        Cog.failed();
        console.log(reason);
      });
  };

  $scope.publishProject = function(ev){
    ev.preventDefault();
    $scope.saveProject(ev)
      .then(function(ev){
        Cog.saving();
        publish($stateParams.id)
        ;
      });
  };

  function publish(projectId){
    return Restangular.oneUrl('projects', "api/v1/projects/" + projectId + "/publish.json").withHttpConfig({timeout: 60000})
      .get()
      .then(function(response){
        Cog.published();
        $scope.response = response;
        return response;
      }).then(function(response) {
        Cog.repoReady();
        console.log(response)
      }).catch(function(reason){
        Cog.failed();
        console.error(reason);
      });
  }
}]);
