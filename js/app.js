var vultrWebClient = angular.module('vultrWebClient', ['ngRoute', 'ngAnimate', 'angular.chosen', 'chart.js']);

/**
 * App Config
 */
vultrWebClient.config([
  '$routeProvider',
  function(
    $routeProvider) {

    $routeProvider.
      when('/', {
        templateUrl: '_partials/sections/login.html',
        controller: 'LoginCtrl',
        label: 'Login'
      }).
      when('/logout', {
        templateUrl: '_partials/sections/login.html',
        controller: 'LogoutCtrl',
        label: 'Logout'
      }).
      when('/machines', {
        templateUrl: '_partials/sections/machines.html',
        controller: 'MachinesCtrl',
        label: 'Machine'
      }).
      when('/machines/:machineId', {
        templateUrl: '_partials/sections/machines.html',
        controller: 'MachinesCtrl',
        label: 'Machine'
      }).
      when('/deploy', {
        templateUrl: '_partials/sections/deploy.html',
        controller: 'DeployCtrl',
        label: 'Deploy'
      }).
      otherwise({
        redirectTo: '/'
      });
}]);
