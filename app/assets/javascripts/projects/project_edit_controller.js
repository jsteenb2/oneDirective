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

    angular.element(document).on('mouseenter', '.tipped', function(event) {
      console.log('hovering');

      nested_targ = angular.element(event.target);
      while (!nested_targ.hasClass('tipped')) {
        nested_targ = nested_targ.parent();
      }
      nested_targ.addClass('tipped-curr');
      TippedService.tipped();
    });

    $rootScope.$on('component.moved', function(ev){
      $scope.rows();
    });
}]);
