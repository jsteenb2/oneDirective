app.controller('ProjectModalCtrl',
['PhotoUploadService', 'Restangular', 'FlashService', 'Publish', function (PhotoUploadService, Restangular, FlashService, Publish) {
  var vm = this;

  function _initUploader () {
    var url = Restangular.one('projects', vm.project.id).getRequestedUrl();
    PhotoUploadService.init(url);
    vm.uploader = PhotoUploadService.getUploader();
  }

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
        Promise.resolve(Publish.success)
          .then(vm.close(value))
          .then(FlashService.custom('success', "You've uploaded a photo"))
          .catch(FlashService.custom('danger', "Upload failed"));
      }
    };
  }

  vm.ok = function (params) {
    var fn = _close({$value: params});
    if (_.isEmpty(vm.uploader.queue)) {
      fn(true);
    } else {
      vm.uploader.onCompleteAll = fn;
      vm.uploader.uploadAll();
      Publish.saving();
    }
  };

  vm.cancel = function () {
    vm.dismiss({$value: 'cancel'});
  };

  vm.fire = function () { console.log('hello'); };

  vm.$onInit = function () {
    _decouple();
    _initUploader();
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
