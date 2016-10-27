app.controller('ProjectCardCtrl',
['ProjectService', '$uibModal', 'FlashService',
function (ProjectService, $uibModal, FlashService) {
  var vm = this;

  function _success (params) {
    FlashService.update('success', 'projects');
    return params;
  }

  function _failure (params) {
    FlashService.update('danger', 'projects');
    return params;
  }

  vm.updateView = function (params) {
    console.log(params);
    angular.copy(params,vm.project);
    return params;
  };

  // Update: using the modal.
  vm.updateProject = function (params) {
    ProjectService.update(params)
      .then(vm.updateView)
      .then(_success,_failure);
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

  // fallback
  vm.showPhoto = function () {
    console.log(vm.project.photo_url.match(/missing.jpg/));
    if (vm.project.photo_url.match(/missing.jpg/)) {
      return "https://s-media-cache-ak0.pinimg.com/originals/0c/e3/9b/0ce39bdb5f239eb6dd46bb2795c2a685.jpg";
    } else {
      return vm.project.photo_url;
    }
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
