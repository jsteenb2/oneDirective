var app = angular.module('materialProto',
['ui.router',
'restangular',
'Devise']);

app.run(['$rootScope', function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
}]);

app.factory('_', ['$window', function($window) {
  return $window._;
}]);

app.config(
  ['$stateProvider', '$urlRouterProvider', 'RestangularProvider',
  function($stateProvider, $urlRouterProvider, RestangularProvider) {

    // Restangular
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('.json');
    RestangularProvider.setDefaultHttpFields({timeout: 3000});

    // ADRIAN feel free to change the routing. --- CJ.
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('projects', {
        abstract: true
      })
      .state('projects.index', {
        url: '/',
        views: {
          '@': {
            templateUrl: 'templates/dashboard.html',
            controller: 'DashboardCtrl'
          }
        }
      })
      .state('projects.show', {
        url: '/:id',
        view: {
          '@': {
            templateUrl: 'templates/edit.html',
            controller: 'ProjectEditCtrl'
          }
        }
      });
}]);
