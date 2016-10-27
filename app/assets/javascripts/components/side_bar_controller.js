app.controller('sideBarCtrl', ["$scope", "rowService", "$rootScope", 'currUser', 'componentService', function($scope, rowService, $rootScope, currUser, componentService){

  $scope.currentUser = currUser;

  $scope.selectedRow = false;
  $scope.selectedComponent = false;

  $scope.initiateComponents = function(type){
    rowService.buildNewComponent(type, $scope.selectedRow);
  };

  $scope.componentTypes = function(){
    
    return componentService.componentKeys();
  };

  $rootScope.$on('selected.row', function(ev, id){
    if($scope.selectedRow === id){
      $scope.selectedRow = false;
    } else {
      $scope.selectedRow = id;
    }
  });
}]);
