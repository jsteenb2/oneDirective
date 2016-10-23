app.controller('ProjectCardCtrl',
['ProjectService', '$uibModal',
function (ProjectService, $uibModal) {
  var vm = this;

  // Update: using the modal.
  vm.updateProject = function (params) {
    ProjectService.update(params);
  };

  // Edit: go to edit page.
  vm.editProject = function (id) {
    var $event = {
      id: id
    };
    vm.onEdit({$event: $event});
  };

  vm.destroyProject = function (params) {
    ProjectService.destroy(params);
  };

  // Modal functionality.
  vm.open = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      component: 'projectModal',
      size: 'lg',
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
  restrict: 'E',
  bindings: {
    project: '<',
    onEdit: '&'
  },
  templateUrl: 'templates/dashboard/project_card.html'
});
