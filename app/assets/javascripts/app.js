var app = angular.module('materialProto',
['ui.router',
'restangular',
'Devise',
'ui.bootstrap']);

app.run(['$rootScope', function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
}]);

// CSRF support
app.config(
  ["$httpProvider",
  function($httpProvider) {
    var token = $('meta[name=csrf-token]')
      .attr('content');
    $httpProvider
      .defaults
      .headers
      .common['X-CSRF-Token'] = token;
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
    $urlRouterProvider.otherwise('/projects');

    $stateProvider
      .state('main', {
        url: '/',
        resolve: {
          currUser: ['Auth', function(Auth) {
            return Auth.currentUser();
          }]
        }
      })
      .state('main.projects', {
        url: 'projects',
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
      .state('main.projects.edit', {
        url: '/:id',
        views: {
          '@' : {
            templateUrl: 'templates/projects/edit.html',
            controller: 'ProjectEditCtrl',
            // controllerAs: 'editCtrl'
          }
        },
        resolve: {
          rowsData: ['RowService', function (RowService) {
            return RowService.all();
          }],
          componentsData: ['ComponentService', function (ComponentService) {
            return ComponentService.all();
          }],
        }
      });
}]);

app.run(['$rootScope', function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
}]);
