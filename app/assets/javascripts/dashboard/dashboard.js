app.controller('DashboardCtrl',
['projectsData', 'ProjectService', '$state',
function (projectData, ProjectService, $state) {
  var vm = this;

  vm.projectsData = projectData;

  vm.addProject = function ($event) {
    ProjectService.create($event.params);
  };

  vm.editProject = function ($event) {
    console.log($event.id);
    $state.go('main.projects.edit', {id: $event.id});
  };
}]);
