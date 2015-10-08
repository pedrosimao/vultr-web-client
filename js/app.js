var vultrWebClient = angular.module('vultrWebClient', ['restangular', 'ngRoute']);

/**
 * App Config
 */
vultrWebClient.config([
  '$routeProvider',
  'RestangularProvider',
  function(
    $routeProvider,
    RestangularProvider) {

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

    // Restangular Config
    RestangularProvider.setBaseUrl('https://api.vultr.com/v1');
    RestangularProvider.setDefaultHttpFields({withCredentials: true});
    RestangularProvider.setDefaultHeaders({
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    });
    RestangularProvider.setResponseExtractor(function(response, operation) {
      if(operation == 'getList') {
        response.objects.meta = response.meta;
        return response.objects;
      } else {
        return response;
      }
    });
}]);
