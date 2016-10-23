app.controller('EditHeightCtrl', function () {
  var vm = this;

  vm.editHeight = function ($event) {
    vm.onUpdate({$event: $event});
  };

  vm.popover = {
    templateUrl: 'templates/component_toolbar/edit_height_popover.html'
  };

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
    uib-popover-placement='right-bottom'
    uib-popover-template='$ctrl.popover.templateUrl'
    class='fa fa-arrows-v fa-4x icon'></i>
  `
});
