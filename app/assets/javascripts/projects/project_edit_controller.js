app.controller('ProjectEditCtrl',
  ['$stateParams', 'ProjectService', 'TippedService', 'currUser', '$scope', 'rowService', "$rootScope", 
  function( $stateParams, ProjectService, TippedService, currUser, $scope, rowService, $rootScope) {
    $scope.currentUser = currUser;
    $scope.config = {
      theme: 'minimal',
      scrollInertia: '500'
    };

    $scope.rows = function(){
      return rowService.getRows();
    };

    angular.element(document).on('mouseenter', '#author-tipped', function() {
      console.log('hovering');
      TippedService.tipped();
    });

    $rootScope.$on('component.moved', function(ev){
      $scope.rows();
    });
}]);
