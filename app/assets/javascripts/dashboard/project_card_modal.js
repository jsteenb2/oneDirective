app.controller('ProjectModalCtrl', function () {
  var vm = this;

  vm.$onInit = function () {
    vm.project = vm.resolve.project;
    vm.title = vm.project.title;
  };

  vm.ok = function (params) {
    vm.close(params);
  };

  vm.cancel = function () {
    vm.dismiss('cancel');
  };
});

app.component('projectModal', {
  controller: 'ProjectModalCtrl',
  restrict: 'E',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'templates/dashboard/project_modal.html'
});
