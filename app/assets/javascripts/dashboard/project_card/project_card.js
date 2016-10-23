app.controller('ProjectCardCtrl',
['ProjectService', '$uibModal',
function (ProjectService, $uibModal) {
  var vm = this;

  vm.updateProject = function (params) {
    ProjectService.update(params);
  };

  vm.destroyProject = function (params) {
    ProjectService.destroy(params);
  };

  // Modal functionality.
  vm.open = function (size) {
    var modalInstance = $uibModal.open({
      animation: true,
      component: 'projectModal',
      size: 'sm',
      resolve: {
        project: function () {
          return vm.project;
        }
      }
    });

    modalInstance.result.then(vm.updateProject);
  };

}]);

app.component('projectCard', {
  controller: 'ProjectCardCtrl',
  bindings: {
    project: '<'
  },
  templateUrl: 'templates/dashboard/project_card/project_card.html'
});
