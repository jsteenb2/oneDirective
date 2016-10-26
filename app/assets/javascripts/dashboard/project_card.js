app.controller('ProjectCardCtrl',
['ProjectService', '$uibModal', 'FlashService',
function (ProjectService, $uibModal, FlashService) {
  var vm = this;

  vm.updateView = function (params) {
    angular.copy(params,vm.project);
  };

  // Update: using the modal.
  vm.updateProject = function (params) {
    ProjectService.update(params)
      .then(vm.updateView)
      .then(FlashService.update('success', 'projects'))
      .catch(FlashService.update('danger', 'projects'));
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
