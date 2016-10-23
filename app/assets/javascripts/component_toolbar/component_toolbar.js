app.controller('ComponentToolbarCtrl', ['ComponentService', function (ComponentService) {
  var vm = this;

  vm.selected = "hello from the toolbar";

  // Need to pass down a component object to each button so they can update.
  vm.updateSelected = function ($event) {
    console.log($event);
  };

  vm.destroySelected = function ($event) {
    console.log($event);
  };

}]);

app.component('componentToolbar', {
  controller: 'ComponentToolbarCtrl',
  restrict: 'E',
  template:
  `
  <edit-height on-update='$ctrl.updateSelected($event)'></edit-height>
  <i class='fa fa-arrows-v fa-4x icon'></i>
  <i class='fa fa-arrows-v fa-4x icon'></i>
  <i class='fa fa-arrows-v fa-4x icon'></i>
  `
});
