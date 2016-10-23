app.controller('DashboardCtrl', ['projectsData', 'ProjectService',
function (projectData, ProjectService) {
  var vm = this;

  vm.projectsData = projectData;

  vm.addProject = function ($event) {
    ProjectService.create($event.params);
  };


}]);
