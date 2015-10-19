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

      $scope.vultr_key = '';
      // Check if we have a stored key, if so redirect to the machines page
      if(api.helpers.get_key()) {
        $location.path('/machines');
      }

      $scope.save_key = function() {
        api.helpers.set_key($scope.vultr_key);
        $location.path('/machines');
        // @TODO: Implement a test API call to check if the key is valid
      };
  }]);
