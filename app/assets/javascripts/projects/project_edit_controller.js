app.controller('ProjectEditCtrl',
  ['$stateParams', 'ProjectService',
  function( $stateParams, ProjectService) {
    vm = this;
    
    vm.currentUser = currUser;

    console.log("still logged in through: ", 
      vm.currentUser);
    console.log('you are in projectEdit controller');


    vm.project = ProjectService.get($stateParams.id);
}]);


