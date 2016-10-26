app.controller('CreateProjectCtrl',
['$uibModal', 'FlashService', function ($uibModal) {
  var vm = this;

  vm.create = function (params) {
    var $event = {
      params: params
    };
    vm.onCreate({$event: $event});
  };

  // Modal functionality.
  vm.open = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      component: 'createProjectModal',
      size: 'lg',
    });

    modalInstance.result.then(vm.create);
  };
}]);

app.component('createProject', {
  controller: 'CreateProjectCtrl',
  bindings: {
    onCreate: '&'
  },
  restrict: 'E',
  template: `<button class='btn btn-primary' ng-click='$ctrl.open()'>Create Project</button>`
});
