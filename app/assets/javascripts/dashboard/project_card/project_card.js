app.component('projectCard', {
  controller: 'ProjectCardCtrl',
  bindings: {
    project: '>',
  },
  templateUrl: 'templates/project_card'
});
