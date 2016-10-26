app.controller('DashboardCtrl',
['projectsData', 'ProjectService', '$state', 'FlashService',
function (projectsData, ProjectService, $state, FlashService) {
  var vm = this;

  vm.projectsData = projectsData;

  vm.addProject = function ($event) {
    FlashService.create('success', 'projects');
    ProjectService.create($event.params);
    };

  vm.editProject = function ($event) {
    $state.go('main.projects.edit', {id: $event.id});
  };
}]);
