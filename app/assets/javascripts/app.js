var app = angular.module('materialProto',
['ui.router',
'restangular',
'Devise',
'ui.bootstrap']);

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
    RestangularProvider.setBaseUrl('api/v1');
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
            templateUrl: 'templates/dashboard/dashboard.html',
            controller: 'DashboardCtrl',
            controllerAs: 'dashCtrl'
          }
        },
        resolve: {
          projectsData: ['ProjectService', function (ProjectService) {
            return ProjectService.all();
          }]
        }
      })
      .state('projects.edit', {
        url: '/:id',
        view: {
          '@': {
            templateUrl: 'templates/projects/edit.html',
            controller: 'ProjectEditCtrl'
          }
        }
      });
}]);
