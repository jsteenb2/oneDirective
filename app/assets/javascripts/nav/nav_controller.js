app.controller('navbarCtrl', ["$scope", "$rootScope", 'currUser', '$stateParams', 'ProjectService', function( $scope, $rootScope, currUser, $stateParams, ProjectService ){

  $scope.currentUser = currUser;

  $scope.saveProject = function(ev){

    ev.preventDefault();
    _saving();
    return ProjectService.saveProjectEdits($stateParams.id)
      .then(function(response){
        _success();
        return response;
      })
      .catch(function(reason){
        console.log(reason);
      });
  };

  // saving UX
  function _saving () {
    angular.element('i.fa-spin').show();
  }

  function _success () {
    angular.element('i.fa-spin').hide();
    angular.element('p.save-success')
      .fadeIn(1000)
      .delay(3000)
      .fadeOut(1000);
  }
}]);
