app.factory('DimensionsService',
['_', function (_) {
  var srv = {};
  var _data = {
    widths: [],
    heights: []
  };

  function _cacheWidths () {
    for (var i = 1; i < 12; i++) {
      _data.widths.push('col-md' + i);
    }
  }

  function _cacheHeights () {
    for (var i = 1; i < 5; i++) {
      _data.heights.push(i + 'em');
    }
  }

  srv.getWidths = function () {
    if (_.isEmpty(_data.widths)) _cacheWidths();
    return _data.widths;
  };

  srv.getHeights = function () {
    if (_.isEmpty(_data.heights)) _cacheHeights();
    return _data.heights;
  };

  return srv;
}]);
