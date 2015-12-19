/**
 * Controller LoginCtrl
 *  Controller for the Login overlay
 */
vultrWebClient.controller('LoginCtrl', [
  '$rootScope',
  '$scope',
  '$location',
  'accountService',
  'apiService',
  function(
    $rootScope,
    $scope,
    $location,
    accountService,
    api
    ) {

      // make sure the machine refresh interval is killed. its not needed here.
      clearInterval($rootScope.machine_list_refresh_interval);

      $scope.vultr_key = '';
      $scope.vultr_email = '';
      $scope.vultr_password = '';
      // Check if we have a stored key, if so redirect to the machines page
      if(accountService.get_key()) {
        $location.path('/machines');
      }

      $scope.login = function() {
        accountService.login($scope.vultr_email, $scope.vultr_password);
      };

      $scope.save_key = function() {
        accountService.add($scope.vultr_key, 'Default');
        $location.path('/machines');
        // @TODO: Implement a test API call to check if the key is valid
      };
  }]);
