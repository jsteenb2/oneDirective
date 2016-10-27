app.controller('DashboardCtrl',
['projectsData', 'ProjectService', '$state', 'FlashService', 'componentService',
function (projectsData, ProjectService, $state, FlashService, componentService) {
  var vm = this;

  componentService.queryAll();

  vm.projectsData = projectsData;

  vm.addProject = function ($event) {
    FlashService.create('success', 'projects');
    ProjectService.create($event.params);
  };

  vm.editProject = function ($event) {
    $state.go('main.projects.edit', {id: $event.id});
  };
}]);
