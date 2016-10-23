app.controller('CreateProjectModalCtrl', function () {
  var vm = this;

  vm.ok = function (params) {
    vm.close(params);
  };

  vm.cancel = function () {
    vm.dismiss('cancel');
  };
});

app.component('createProjectModal', {
  controller: 'CreateProjectModalCtrl',
  restrict: 'E',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'templates/dashboard/create_project_modal/create_project_modal.html'
});
