app.controller('CreateProjectCtrl', function () {
  var vm = this;

  vm.create = function (params) {
    vm.onCreate({params: 'hello'});
  };
});

app.component('createProject', {
  controller: 'CreateProjectCtrl',
  bindings: {
    onCreate: '&'
  },
  restrict: 'E',
  template: "<button class='btn btn-primary' ng-click='$ctrl.create()'>Create Project</button>"
});
