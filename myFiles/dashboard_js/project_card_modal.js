app.controller('ProjectModalCtrl',
['PhotoUploadService', 'Restangular', function (PhotoUploadService, Restangular) {
  var vm = this;

  vm.$onInit = function () {
    vm.project = {};
    angular.copy(vm.resolve.project, vm.project);
    vm.title = vm.project.title;
    var url = Restangular.one('projects', vm.project.id).getRequestedUrl();
    PhotoUploadService.init(url);
    vm.uploader = PhotoUploadService.getUploader();
  };

  vm.ok = function (params) {
    vm.close({$value: params});
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
