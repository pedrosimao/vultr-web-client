/**
 * Controller LoginCtrl
 *  Controller for the Login overlay
 */
vultrWebClient.controller('LoginCtrl', [
  '$rootScope',
  '$scope',
  '$location',
  'apiService',
  function(
    $rootScope,
    $scope,
    $location,
    api
    ) {

      // make sure the machine refresh interval is killed. its not needed here.
      clearInterval($rootScope.machine_list_refresh_interval);

      // Check if we have a stored key, if so redirect to the machines page
      if(api.helpers.getKey()) {
        console.log(api.helpers.getKey());
        api.accounts.list();
        api.server.list();
        $location.path('/machines');
      }

      $scope.saveKey = function() {
        api.helpers.setKey($scope.vultrKey);
        api.accounts.list();
        $location.path('/machines');
        // @TODO: Implement a test API call to check if the key is valid
      };
  }]);
