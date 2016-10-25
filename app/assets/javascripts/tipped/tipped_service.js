app.factory('TippedService', 
  ["_",
  function(_){
  var stub = {};

  var _width = 0;
  var _offset = 0;

  stub.tipped = function () {

    Tipped.create("#author-tipped",  
    `
    <a class="btn btn-danger btn-small" style="border: 1px solid red">Delete</a>
    <p>How big is your grid?</p>
    <p> Offset: `+ _offset +` | Width: ` + _width + `</p>
    <div id=\"slider\" class=\"col-xs-6\" style=\"width: 100\%\"></div>
    `,
    { skin: 'white',
      closeButton: true,
      hook: 'bottomright',
      onShow: function(content, element) {
        console.log('showing slider');
        $( "#slider" ).slider();
      },
      afterUpdate: function(content, element) {
        $( "#slider" ).slider({
          range: true,
          min: _offset,
          max: 12 - _width,
          values: [_offset, _width],
          slide: function(event, ui) {
            console.log('event: ', event);
            console.log('ui: ', ui);
            _offset = $('#slider').slider("values", 0);
            _width = $('#slider').slider("values", 1);

            // $('#slider').('max')

            $("#author-tipped").attr('class', '');
            $("#author-tipped").addClass('col-xs-' + $('#slider').slider("values", 1));
            $("#author-tipped").addClass('col-xs-offset-' + $('#slider').slider("values", 0));
            $("#author-tipped").addClass('container-fluid')
            $("#author-tipped").attr('style', 'border: 1px dotted black');
          }
        });
      }
    })
  };

  return stub;
}]);
