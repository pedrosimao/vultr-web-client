var vultrWebClient = angular.module('vultrWebClient', ['ngRoute']);

/**
 * App Config
 */
vultrWebClient.config([
  '$routeProvider',
  function(
    $routeProvider) {

    $routeProvider.
      when('/machines', {
        templateUrl: '_partials/machines.html',
        controller: 'MachinesCtrl',
        label: 'Machine'
      }).
      when('/machines/:machineId', {
        templateUrl: '_partials/machines.html',
        controller: 'MachinesCtrl',
        label: 'Machine'
      }).
      when('/deploy', {
        templateUrl: '_partials/deploy.html',
        controller: 'DeployCtrl',
        label: 'Deploy'
      }).
      otherwise({
        redirectTo: '/machines'
      });
}]);
