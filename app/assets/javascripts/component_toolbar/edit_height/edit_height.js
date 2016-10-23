app.controller('EditHeightCtrl', function () {
  var vm = this;

  vm.editHeight = function ($event) {
    vm.onUpdate({$event: $event});
  };
});

app.component('editHeight', {
  controller: 'EditHeightCtrl',
  bindings: {
    selected: '<',
    onUpdate: '&'
  },
  restrict: 'E',
  template: "<i fa-arrows-v></i>"
});
