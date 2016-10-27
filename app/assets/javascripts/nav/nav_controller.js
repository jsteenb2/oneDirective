app.controller('navbarCtrl', ["$scope", "$rootScope", 'currUser', '$stateParams', 'ProjectService', 'Restangular', function( $scope, $rootScope, currUser, $stateParams, ProjectService, Restangular ){

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
