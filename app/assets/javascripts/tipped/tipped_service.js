app.factory('TippedService', 
  ["_",
  // johnny inject your component service.
  function(_){
  var stub = {};

  var _width = 12;
  var _offset = 0;

  stub.tipped = function () {
    Tipped.create("#author-tipped",  
    `
    <a class="btn btn-danger btn-small" id="delete-component" style="border: 1px solid red">Delete</a>
    <p>How big is your grid?</p>
    <p> Offset: `+ `<code id="offset">0</code>` +` | Width: ` + `<code id="width">12</code>` + `</p>
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
          min: -1,
          max: 13,
          values: [_offset, _width],
          slide: function(event, ui) {
            // console.log('event: ', event);
            // console.log('ui: ', ui);
            _offset = $('#slider').slider("values", 0);
            if (parseInt(_offset) === -1) { _offset += 1; };
            _width = $('#slider').slider("values", 1);
            if (parseInt(_width) === 13) { _offset -= 1; };

            $("#offset").html(_offset);
            $("width").html(_width);


            $("#author-tipped").attr('class', '');
            $("#author-tipped").addClass('col-xs-' + $('#slider').slider("values", 1));
            $("#author-tipped").addClass('col-xs-offset-' + $('#slider').slider("values", 0));
            $("#author-tipped").addClass('container-fluid')
            $("#author-tipped").attr('style', 'border: 1px dotted black');
          }
        });
      }
    })

    // johnny write your code here.
    // this where you link up your delete service 
    angular.element(document).on('click', '#delete-component', function(){
      console.log('hi johnny');
    });
  };

  return stub;
}]);
