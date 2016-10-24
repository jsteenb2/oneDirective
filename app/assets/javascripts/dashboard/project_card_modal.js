app.controller('ProjectModalCtrl',
['FileUploader', 'Restangular', function (FileUploader, Restangular) {
  var vm = this;

  vm.$onInit = function () {
    vm.project = vm.resolve.project;
    vm.title = vm.project.title;

    // angular-file-upload
    var csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    vm.uploader = new FileUploader({
      url: Restangular.one('projects', vm.project.id).getRequestedUrl(),
      method: 'PATCH',
      alias: 'project_photo',
      withCredentials: true,
      headers: {
        'X-CSRF-TOKEN': csrf_token
      }
    });
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
