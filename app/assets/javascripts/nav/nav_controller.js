app.controller('navbarCtrl', ["$scope", "$rootScope", 'currUser', '$stateParams', 'ProjectService', function( $scope, $rootScope, currUser, $stateParams, ProjectService ){

  $scope.currentUser = currUser;

  $scope.saveProject = function(ev){
    $scope.saving = true;
    ev.preventDefault();
    return ProjectService.saveProjectEdits($stateParams.id)
      .then(function(response){
        _toggleSave();
        _success();
        return response;
      })
      .catch(function(reason){
        console.log(reason);
      });
  };

  // saving UX
  $scope.saving = false;

  function _toggleSave () {
    $scope.saving = !$scope.saving;
  }

  function _success () {
    angular.element('span.save-success')
      .fadeIn(1000)
      .delay(3000)
      .fadeOut(1000)
      .removeClass('save-success');
  }
}]);
