app.controller('EditHeightCtrl', function () {
  var vm = this;

  vm.editHeight = function ($event) {
    vm.onUpdate({$event: $event});
  };

  vm.popover = {
    templateUrl: 'templates/component_toolbar/edit_height_popover.html'
  };

  // Placeholder.
  vm.options = [1, 2, 3, 4, 5];

});

app.component('editHeight', {
  controller: 'EditHeightCtrl',
  bindings: {
    selected: '<',
    onUpdate: '&'
  },
  restrict: 'E',
  template:
  `
    <i
    popover-placement='auto'
    popover-append-to-body='true'
    popover-title='Edit Height'
    uib-popover-template='$ctrl.popover.templateUrl'
    class='fa fa-arrows-v fa-4x icon'></i>
  `
});
