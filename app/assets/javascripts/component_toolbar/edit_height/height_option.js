app.controller('HeightOptionCtrl', function () {
  var vm = this;

  vm.choose = function (option) {
    var $event = {
      option: option
    };
    vm.onSelect({$event: $event});
  };
});

app.component('heightOption', {
  controller: 'HeightOptionCtrl',
  bindings: {
    option: '<',
    onSelect: '&'
  },
  restrict: 'E',
  template:
  `
  <button
  class='btn btn-default'
  ng-click='$ctrl.choose($ctrl.option)'>
  {{$ctrl.option}}
  </button>
  `
});
