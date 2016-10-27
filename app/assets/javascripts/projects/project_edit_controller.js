app.controller('ProjectEditCtrl',
  ['$stateParams', 'ProjectService', 'TippedService', 'currUser', '$scope', 'rowService', "$rootScope", 'FlashService', '$timeout',
  function( $stateParams, ProjectService, TippedService, currUser, $scope, rowService, $rootScope, FlashService, $timeout) {
    $scope.currentUser = currUser;
    $scope.config = {
      theme: 'minimal',
      scrollInertia: '500'
    };

    $scope.rows = function(){
      return rowService.getRows();
    };

    angular.element(document).on('mouseenter', '.tipped', function(event) {


      nested_targ = angular.element(event.target);
      while (!nested_targ.hasClass('tipped')) {
        nested_targ = nested_targ.parent();
      }
      nested_targ.addClass('tipped-curr');
      $timeout(TippedService.tipped() , 100);
    });

    $rootScope.$on('component.changed', function(ev){
      $scope.rows();
    });

    // updating dimensions
      $rootScope.$on('dimensions.update', function (ev, arg) {
        var compId = arg.component.attributes['data-component-id'].value;
        var newWidth = arg.width;
        var newOffset = arg.offset;
        var component = componentService.getComponent(compId);
        component.width = arg.width;
        component.offset = arg.offset;
      });

}]);
