app.controller('EditHeightCtrl', function () {
  var vm = this;

  vm.editHeight = function ($event) {
    vm.onEdit({$event: $event.params});
  };
});

app.component('editHeight', {
  controller: 'EditHeightCtrl',
  bindings: {
    selected: '<',
    onEdit: '&'
  },
  restrict: 'E',
  template: "<i fa-arrows-v></i>"
});
