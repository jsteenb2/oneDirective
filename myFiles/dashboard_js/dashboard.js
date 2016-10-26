app.controller('DashboardCtrl',
['projectsData', 'ProjectService', '$state',
function (projectsData, ProjectService, $state) {
  var vm = this;

  vm.projectsData = projectsData;

  vm.addProject = function ($event) {
    ProjectService.create($event.params);
  };

  vm.editProject = function ($event) {
    $state.go('main.projects.edit', {id: $event.id});
  };
}]);
