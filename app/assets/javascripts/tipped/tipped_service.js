app.factory('TippedService',
  ["_", 'rowService', 'componentService', '$rootScope', function(_, rowService, componentService, $rootScope){
  var stub = {};

  var _width = 12;
  var _offset = 0;

  stub.tipped = function () {
    Tipped.create('.tipped-curr',
    `
    <a class="btn btn-danger btn-small" id="delete-component" style="border: 1px solid red">Delete</a>
    <p>How big is your grid?</p>
    <p> Offset: <code id="off-set">` + _offset + `</code> | Width: <code id="width">` + _width + `</code></p>
    <div id=\"slider\" class=\"col-xs-12\" style=\"width: 100\%\"></div>
    `,
    { skin: 'white',
      // closeButton: true,
      hook: 'bottomright',
      onShow: function(content, element) {
        console.log('showing slider');
        $("#slider" ).slider({
          range: true,
          min: -1,
          max: 13,
          values: [_offset, _width],
          slide: function(event, ui) {

            //adjusts for edge cases
            _offset = $('#slider').slider("values", 0);
            if (parseInt(_offset) === -1) { _offset = parseInt(_offset) + 1; }
            _width = $('#slider').slider("values", 1);
            if (parseInt(_width) === 13) { _width = parseInt(_width) - 1; }
            //displays current offset and width
            $("#off-set").html($('#slider').slider("values", 0));
            $("#width").html($('#slider').slider("values", 1));
            //addes class to author-tipped to give it proper gridding
            $(element).attr('class', '')
              .addClass('tipped')
              .addClass('col-xs-' + _width)
              .addClass('col-xs-offset-' + _offset)
              .addClass('container-fluid')
              .attr('style', 'border: 1px dotted black');
            }
          });


        angular.element(content).on('click', '#delete-component', function(){
          var compId = angular.element(element).closest('component')
                          .first()
                          .data('comp-id');
          compId = parseInt(compId);
          var component = componentService.getComponent(compId);
          component.remove();
          $rootScope.$broadcast('component.changed');
        });
      },
      afterUpdate: function(content, element) {

      },

      onHide: function(content, element) {
        console.log('deleting tooltip');
        Tipped.remove('.tipped-curr');

        $('.t_ContentContainer.t_clearfix.t_Content_white').remove();
        angular.element(element)
          .attr('style', '')
          .removeClass('tipped-curr');

        $("#slider").slider("destroy");
      }
    });


  };

  return stub;
}]);
