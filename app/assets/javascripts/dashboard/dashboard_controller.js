app.controller('DashboardCtrl', ['projectsData', 'ProjectService',
function (projectData, ProjectService) {
  var vm = this;

  vm.projectsData = projectData;

  vm.addProject = function (params) {
    ProjectService.create(params);
  };


}]);
