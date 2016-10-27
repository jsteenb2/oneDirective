app.factory('TippedService', 
  ["_", 'rowService', 'componentService', '$rootScope', function(_, rowService, componentService, $rootScope){
  var stub = {};

  var _width = 12;
  var _offset = 0;

  var _template = function () {
    return '<a class="btn btn-danger btn-small" id="delete-component" style="border: 1px solid red">Delete</a><p>How big is your grid?</p><p> Offset: <code id="off-set">' +
          _offset +
          '</code> | Width: <code id="width">' + _width + '</code></p><div id=\"slider\" class=\"col-xs-12\" style=\"width: 100\%\"></div>';
  };

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
      onShow: _initializeSlider,
      onHide: _deleteTipped
    },
    template: _template
  };

  function _buildSlider (sliderConfig) {
    var $slider = $("#slider" );
    $slider.slider(sliderConfig);
    _data.slider = $slider;
  }

  // use this data to display the element being hovered over.
  function _initializeSlider (content, element) {
    _buildSlider(_data.sliderConfig);
    _data.element = element;
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

  function _updateDimensions (event, ui) {
    // adjusts for edge cases
    _offset = $("#slider").slider("values", 0);
    if (parseInt(_offset) === -1) { _offset = parseInt(_offset) + 1; }
    _width = $("#slider").slider("values", 1);
    if (parseInt(_width) === 13) { _width = parseInt(_width) - 1; }
    //displays current offset and width
    $("#off-set").html($('#slider').slider("values", 0));
    $("#width").html($('#slider').slider("values", 1));
    //addes class to author-tipped to give it proper gridding
    if (_data.element) {
      $(_data.element).attr('class', '')
        .addClass('tipped')
        .addClass('col-xs-' + _width)
        .addClass('col-xs-offset-' + _offset)
        .addClass('container-fluid')
        .attr('style', 'border: 1px dotted black');
    }
    var compParams = {
      width: _width,
      offset: _offset,
      component: _data.element
    };
    $rootScope.$emit('dimensions.update', compParams);
  }

  function _deleteTipped (content, element) {
    Tipped.remove('.tipped-curr');
    angular.element('t_Tooltip.t_Tooltip_white.t_hidden').remove();
    $('.t_ContentContainer.t_clearfix.t_Content_white').remove();
    angular.element(element)
      .attr('style', '')
      .removeClass('tipped-curr');
    $("#slider" ).slider("destroy");
  }

  stub.tipped = function () {
    Tipped.remove('.tipped-curr');
    $('.t_ContentContainer.t_clearfix.t_Content_white').remove();
    Tipped.create('.tipped-curr',_data.template(),_data.tippedConfig);
  };

  return stub;
}]);
