app.factory('Cog', [function () {
  var srv = {};
  var _dom = {
    getSave: function () {
      return angular.element('p.save-success');
    },
    getPub: function () {
      return angular.element('p.publish-success');
    },
    getRepoReady: function () {
      return angular.element('a.repo-ready');
    },
    getCog: function () {
      return angular.element('i.fa-spin');
    }
  };

  function _killAnim (key) {
    _dom[key]().stop(true,true)
      .hide();
  }

  function _killAnims () {
    var keys = Object.keys(_dom);
    keys.forEach(_killAnim);
  }

  srv.saving = function () {
    _killAnims();
    _dom.getCog().show();
  };

  srv.success = function () {
    _dom.getCog().hide();
    _dom.getSave()
      .fadeIn(500)
      .delay(3000)
      .fadeOut(500);
  };

  srv.published = function () {
    _dom.getCog().hide();
    _dom.getPub()
      .fadeIn(500)
      .delay(3000)
      .fadeOut(500);
  };

  srv.repoReady = function () {
    _killAnims();
    _dom.getRepoReady().show();
  };

  srv.failed = function () {
    _dom.getCog().hide();
  };

  return srv;
}]);
