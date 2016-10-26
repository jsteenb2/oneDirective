app.directive('scrollToTop', ['$window', function($window) {
  return {
    restrict: 'A',
    link: function (scope, el, attrs) {
      angular.element($window).bind('scroll', function () {
        if ($window.pageYOffset > 0) {
          el.fadeOut(20);
        } else {
          el.fadeIn(100);
        }
      });
    }
  };
}]);
