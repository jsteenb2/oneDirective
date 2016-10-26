app.controller('ProjectModalCtrl',
['PhotoUploadService', 'Restangular', 'FlashService', function (PhotoUploadService, Restangular, FlashService) {
  var vm = this;

  function _decouple () {
    vm.project = {};
    angular.copy(vm.resolve.project, vm.project);
    vm.title = vm.project.title;
  }

  function _close (value) {
    return function (emptyQueue) {
      if (emptyQueue) {
        vm.close(value);
      } else {
        Promise.resolve(vm.close(value))
          .then(FlashService.custom('success', "You've uploaded a photo"))
          .catch(FlashService.custom('danger', "Upload failed"));
      }
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
    if (_.isEmpty(vm.uploader.queue)) {
      fn(true);
    } else {
      vm.uploader.onCompleteAll = fn;
      vm.uploader.uploadAll();
    }
  };

  vm.cancel = function () {
    vm.dismiss({$value: 'cancel'});
  };

  vm.fire = function () { console.log('hello'); };
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
