app.controller('ComponentToolbarCtrl', [function () {
  var vm = this;

  vm.selected = "hello from the toolbar";

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
  templateUrl: 'templates/component_toolbar/component_toolbar.html'
});
