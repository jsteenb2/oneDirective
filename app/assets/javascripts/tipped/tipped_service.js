app.factory('TippedService', ["_", 'rowService', 'componentService', '$rootScope', function(_, rowService, componentService, $rootScope){
  var stub = {};

  var _width = 12;
  var _offset = 0;
  var _data = {
    slider: undefined,
    sliderConfig: {
        range: true,
        min: -1,
        max: 13,
        values: [_offset, _width],
        slide: _updateDimensions
    },
    tippedConfig: {
      skin: 'white',
      // closeButton: true,
      hook: 'bottomright',
      onShow: _updateDimensions,
      onHide: _deleteTipped
    },
    template: _template
  };

  var _template = '<a class="btn btn-danger btn-small" id="delete-component" style="border: 1px solid red">Delete</a><p>How big is your grid?</p><p> Offset: <code id="off-set">' +
                  _offset +
                  '</code> | Width: <code id="width">` + _width + `</code></p><div id=\"slider\" class=\"col-xs-12\" style=\"width: 100\%\"></div>';

  function _buildSlider (sliderConfig) {
    var $slider = $("#slider" );
    $slider.slider(sliderConfig);
    _data.slider = $slider;
  }

  // use this data to display the element being hovered over.
  function _initializeSlider (content, element) {
    _buildSlider(_data.sliderConfig);
    angular.element(content).on('click', '#delete-component', function(){
      var compId = angular.element(element).closest('component')
                      .first()
                      .data('comp-id');
      compId = parseInt(compId);
      var component = componentService.getComponent(compId);
      component.remove().then(function(response){
        $rootScope.$emit('component.changed', compId);
      });
    });
  }

  // remember to jquery remove stuff

  function _updateDimensions (event, ui) {
    // whenever the slider slides.
    // there's two ticks in the sldier; val 0 is the first drag handle, val 1 is the second drag handle;
    // it's like a double range slider
    // adjusts for edge cases
    _offset = _data.slider.slider("values", 0);
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

  function _deleteTipped (content, element) {
    Tipped.remove('.tipped-curr');
    $('.t_ContentContainer.t_clearfix.t_Content_white').remove();
    angular.element(element)
      .attr('style', '')
      .removeClass('tipped-curr');
    _data.slider.slider("destroy");
  }

  stub.tipped = function () {
    Tipped.create('.tipped-curr',_data.template,_data.tippedConfig);
  };

  return stub;
}]);
