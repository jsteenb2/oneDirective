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

    // $rootScope.$on('save.project', function(ev){
    //   ProjectService.saveProjectEdits($stateparams.id)
    //     .then(function(response){
    //       console.log(response);
    //       return response;
    //     })
    //     .catch(function(reason){
    //       console.log(reason);
    //     });
    // });

    $rootScope.$on('component.moved', function(ev){
      $scope.rows();
    });


    //don't really need this
    // $scope.project = ProjectService.get($stateParams.id);
    //only rows relevant to project
    // $scope.rows = RowService.get($stateParams.id);
}]);
