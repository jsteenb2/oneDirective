app.controller('CreateProjectModalCtrl', function () {
  var vm = this;

  vm.ok = function (params) {
    // Need to map the value to $value.
    vm.close({$value: params});
  };

  vm.cancel = function () {
    vm.dismiss({$value: 'cancel'});
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
  templateUrl: 'templates/dashboard/create_project_modal.html'
});
