app.directive('draggable', function() {
  return {
    restrict:'A',
    link: function(scope, element, attrs) {
      element.draggable({
        revert: true,
        appendTo: '.droppable',
        connectToSortable: '.droppable'
      });
    }
  };
});
