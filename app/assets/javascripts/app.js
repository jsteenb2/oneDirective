var app = angular.module('materialProto',
['ui.router',
'restangular',
'Devise',
'ui.bootstrap',
'ui.tinymce']);

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
          },
          'navbar@': {
            templateUrl: 'templates/nav/navbar.html',
            controller: 'navbarCtrl'
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
            controller: 'ProjectEditCtrl'
          },
          'sideBar@main.projects.edit': {
            templateUrl: 'templates/projects/sidebar.html',
            controller: 'sideBarCtrl'
          },
          'saveHandler@main.projects': {
            templateUrl: 'templates/nav/save_handler.html',
            controller: 'navbarCtrl'
          }
        },
        resolve: {
          componentSelection: ['componentService', function(componentService){
            return componentService.cacheComponentLibrary();
          }],
          projectData: ["$stateParams", "ProjectService", function($stateParams, ProjectService){
            return ProjectService.get($stateParams.id);
          }]
        }
      });
}]);

app.run(['$rootScope', function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
}]);
