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
    RestangularProvider.setBaseUrl('/api/v1');
    RestangularProvider.setRequestSuffix('/');
    RestangularProvider.setResponseExtractor(function(response, operation) {
      if(operation == 'getList') {
        response.objects.meta = response.meta;
        return response.objects;
      } else {
        return response;
      }
    });
}]);
