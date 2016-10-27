app.factory('Cog', [function () {
  var srv = {};
  var _dom = {
    getSave: function () {
      return angular.element('p.save-success');
    },
    getPub: function () {
      return angular.element('p.publish-success');
    },
    getCog: function () {
      return angular.element('i.fa-spin');
    }
  };

  srv.saving = function () {
    _dom.getSave().stop(true,false);
    _dom.getSave().hide();
    _dom.getCog().show();
  };

  srv.success = function () {
    _dom.getCog().hide();
    _dom.getSave()
      .fadeIn(1000)
      .delay(3000)
      .fadeOut(1000);
  };

  srv.published = function () {
    _dom.getCog().hide();
    _dom.getPub()
      .fadeIn(1000)
      .delay(3000)
      .fadeOut(1000);
  };

  srv.failed = function () {
    _dom.getCog().hide();
  };

  return srv;
}]);
