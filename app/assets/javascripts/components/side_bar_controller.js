app.controller('sideBarCtrl', ["$scope", "rowService", "$rootScope", 'currUser', function($scope, rowService, $rootScope, currUser){

  $scope.currentUser = currUser;

  $scope.selectedRow = false;
  $scope.selectedComponent = false;

  $scope.initiateComponents = function(type){
    rowService.buildNewComponent(type, $scope.selectedRow);
  };

  $rootScope.$on('selected.row', function(ev, id){
    if($scope.selectedRow === id){
      $scope.selectedRow = false;
    } else {
      $scope.selectedRow = id;
    }
  });
}]);
