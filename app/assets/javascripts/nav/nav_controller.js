app.controller('navbarCtrl', ["$scope", "$rootScope", 'currUser', '$stateParams', 'ProjectService', '$http', '$location', '$window', function( $scope, $rootScope, currUser, $stateParams, ProjectService, $http, $location, $window ){

  $scope.currentUser = currUser;

  $scope.signOut = function(){
    $http.delete('users/sign_out');
    $window.location.reload();
  };

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
}]);
