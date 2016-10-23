app.controller('EditHeightCtrl', ['DimensionsService', function (DimensionsService) {
  var vm = this;

  vm.$onInit = function () {
    vm.options = DimensionsService.getHeights();
  };

  vm.editHeight = function ($event) {
    vm.onUpdate({$event: $event});
  };

  vm.popover = {
    templateUrl: 'templates/component_toolbar/edit_height_popover.html'
  };

}]);

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
