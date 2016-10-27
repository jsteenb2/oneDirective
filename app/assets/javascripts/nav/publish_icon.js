app.factory('Publish', [function () {
  var srv = {};
  var _dom = {
    getSave: function () {
      return angular.element('p.save-success');
    },
    getCog: function () {
      return angular.element('i.fa-spin');
    }
  };

  // saving UX
  srv.saving = function () {
    console.log('this is firing');
    _dom.getSave().stop(true,false);
    _dom.getSave().hide();
    _dom.getCog().show();
  };

  srv.success = function () {
    _dom.getCog().hide();
    _dom.getSave().fadeIn(1000)
      .delay(3000)
      .fadeOut(1000);
  };

  return srv;
}]);
