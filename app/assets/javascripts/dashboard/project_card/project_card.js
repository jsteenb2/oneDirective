app.component('projectCard', {
  controller: 'ProjectCardCtrl',
  bindings: {
    project: '>',
    onCheck: '&'
  }
});
