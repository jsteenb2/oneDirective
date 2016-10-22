app.controller('ProjectCardCtrl', ['ProjectService', function () {
  var vm = this;

  vm.updateProject = function (params) {
    ProjectService.update(params);
  };

  vm.destroyProject = function (params) {
    ProjectService.destroy(params);
  };
}]);

app.component('projectCard', {
  controller: 'ProjectCardCtrl',
  bindings: {
    project: '<'
  },
  templateUrl: 'templates/dashboard/project_card/project_card.html'
});
