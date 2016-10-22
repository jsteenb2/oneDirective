app.controller('ProjectModalCtrl', function () {
  var vm = this;

  vm.update = function (params) {
    vm.onUpdate({params: params});
  };

  vm.destroy = function (project) {
    vm.onDestroy({project: project});
  };
});

app.component('projectModal', {
  controller: 'ProjectModalCtrl',
  restrict: 'E',
  bindings: {
    project: '>',
    onUpdate: '&',
    onDestroy: '&'
  },
  templateUrl: 'templates/dashboard/project_modal/project_modal.html'
});
