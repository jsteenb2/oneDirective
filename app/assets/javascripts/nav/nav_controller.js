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
    var $save = angular.element('p.save-success');
    var $cog = angular.element('i.fa-spin');
    $save.stop(true,false);
    $save.hide();
    $cog.show();
  }

  function _success () {
    var $save = angular.element('p.save-success');
    var $cog = angular.element('i.fa-spin');
    $cog.hide();
    $save.fadeIn(1000)
      .delay(3000)
      .fadeOut(1000);
  }
}]);
