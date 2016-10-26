app.directive('droppable', function($compile) {
  return {
    restrict: 'A',
    link: function(scope,element,attrs){
      element.droppable({
        accept: ".draggable",
        tolerance: 'pointer',
        classes: {
          'ui-droppable-hover': 'drop-row'
        },
        drop: function(event,ui) {
          console.log(event);
          console.log(ui);
          event.target.append(ui.draggable[0]);
        }
      });
      element.sortable({
        helper: 'clone',
        grid: [20, 10],
        scroll: true,
        cursor: 'move',
        placeholder: "sortable-placeholder"
      });
    }
  };
});
