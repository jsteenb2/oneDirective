app.controller('ProjectModalCtrl',
['PhotoUploadService', 'Restangular', function (PhotoUploadService, Restangular) {
  var vm = this;

  function _decouple () {
    vm.project = {};
    angular.copy(vm.resolve.project, vm.project);
    vm.title = vm.project.title;
  }

  function _close (value) {
    return function () {
      vm.close(value);
    };
  }

  function _initUploader () {
    var url = Restangular.one('projects', vm.project.id).getRequestedUrl();
    PhotoUploadService.init(url);
    vm.uploader = PhotoUploadService.getUploader();
  }

  vm.$onInit = function () {
    _decouple();
    _initUploader();
  };

  vm.ok = function (params) {
    var fn = _close({$value: params});
    PhotoUploadService.setCompleteCallback(fn);
    PhotoUploadService.uploadAll();
  };

  vm.cancel = function () {
    vm.dismiss({$value: 'cancel'});
  };
}]);

app.component('projectModal', {
  controller: 'ProjectModalCtrl',
  restrict: 'E',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  templateUrl: 'templates/dashboard/project_modal.html'
});
